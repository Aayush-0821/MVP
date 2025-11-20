import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from '../context/AuthProvider';

export default function Dashboard() {
  const { user } = useAuth();
  const [recent, setRecent] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [profilesMap, setProfilesMap] = useState(new Map());
  const [myStats, setMyStats] = useState(null);
  const [myProfile, setMyProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      // recent results
      const { data: recentData, error: recentError } = await supabase
        .from('results')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(20);
      if (recentError) console.error('Failed to fetch recent results', recentError.message);
      setRecent(recentData ?? []);

      // leaderboard: read from leaderboard view (aggregated best score per user)
      const { data: lbData, error: lbError } = await supabase
        .from('leaderboard')
        .select('*')
        .limit(10);
      if (lbError) console.error('Failed to fetch leaderboard view', lbError.message);
      setLeaderboard(lbData ?? []);

      // collect user ids and emails to resolve display names from profiles
      const userIds = new Set();
      const emails = new Set();
      (recentData ?? []).forEach(r => { if (r.user_id) userIds.add(r.user_id); if (r.user_email) emails.add(r.user_email); });
      (lbData ?? []).forEach(r => { if (r.user_id) userIds.add(r.user_id); if (r.user_email) emails.add(r.user_email); });

      // query profiles for these users (by user_id and/or email)
      const profiles = [];
      try {
        if (userIds.size > 0) {
          const ids = Array.from(userIds);
          const { data: p1 } = await supabase.from('profiles').select('*').in('user_id', ids);
          if (p1) profiles.push(...p1);
        }
        if (emails.size > 0) {
          const ems = Array.from(emails);
          const { data: p2 } = await supabase.from('profiles').select('*').in('email', ems);
          if (p2) profiles.push(...p2);
        }
      } catch (err) {
        console.error('Failed to load profiles', err.message || err);
      }

      const map = new Map();
      profiles.forEach(p => map.set(p.user_id ?? p.email, p));
      setProfilesMap(map);

      // if signed in, compute my stats and fetch profile
      if (user?.id) {
        try {
          const { data: myRes } = await supabase
            .from('results')
            .select('score, created_at')
            .eq('user_id', user.id);
          const totalGames = (myRes ?? []).length;
          const best = (myRes ?? []).reduce((m, r) => (r.score > m ? r.score : m), 0);
          const totalPoints = (myRes ?? []).reduce((s, r) => s + (r.score || 0), 0);
          const lastPlayed = (myRes ?? []).sort((a,b)=>new Date(b.created_at)-new Date(a.created_at))[0]?.created_at ?? null;
          setMyStats({ totalGames, best, totalPoints, lastPlayed });
          
          const { data: pData } = await supabase.from('profiles').select('*').eq('user_id', user.id).single();
          setMyProfile(pData);
        } catch (err) {
          console.error('Failed to compute my stats', err.message || err);
        }
      }

      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Dashboard</h1>

        {/* Profile Card */}
        {user && (
          <div className="mb-10 p-8 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-2xl shadow-lg text-white">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-6">
                <img
                  src={myProfile?.avatar_url ?? user.user_metadata?.avatar_url ?? `https://ui-avatars.com/api/?name=${encodeURIComponent(myProfile?.display_name ?? myProfile?.full_name ?? user.email)}&background=7c3aed&color=fff&rounded=true&size=120`}
                  alt="avatar"
                  className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"
                />
                <div>
                  <h2 className="text-3xl font-bold">{myProfile?.display_name ?? myProfile?.full_name ?? user.email}</h2>
                  <p className="text-purple-100 text-sm">{myProfile?.username ?? 'No username'}</p>
                  <p className="text-purple-100">{user.email}</p>
                </div>
              </div>
            </div>
            
            {/* Stats Grid */}
            <div className="mt-8 grid grid-cols-3 gap-4">
              <div className="bg-white/20 backdrop-blur-sm p-4 rounded-lg text-center">
                <div className="text-3xl font-bold">{myStats?.totalGames ?? 0}</div>
                <div className="text-purple-100 text-sm">Total Games</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm p-4 rounded-lg text-center">
                <div className="text-3xl font-bold">{myStats?.best ?? 0}</div>
                <div className="text-purple-100 text-sm">Best Score</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm p-4 rounded-lg text-center">
                <div className="text-3xl font-bold">{myStats?.totalPoints ?? 0}</div>
                <div className="text-purple-100 text-sm">Total Points</div>
              </div>
            </div>
          </div>
        )}

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">🏆 Leaderboard</h2>
          {loading ? (
            <div className="text-center py-8 text-gray-500">Loading leaderboard...</div>
          ) : (
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              {leaderboard.length === 0 && <div className="p-8 text-center text-gray-500">No scores yet.</div>}
              {leaderboard.map((row, idx) => (
                <div key={idx} className={`p-4 flex justify-between items-center border-b last:border-b-0 ${idx < 3 ? 'bg-gradient-to-r from-yellow-50 to-transparent' : ''}`}>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 text-white font-bold flex items-center justify-center">
                      {idx + 1}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-800">{row.username ?? row.display_name ?? row.user_email ?? 'Anonymous'}</div>
                      <div className="text-xs text-gray-500">{new Date(row.latest_at).toLocaleDateString()}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-indigo-600">{row.best_score}</div>
                    {idx === 0 && <span className="text-xs bg-yellow-200 text-yellow-800 px-2 py-1 rounded-full">👑 Leader</span>}
                    {idx === 1 && <span className="text-xs bg-gray-300 text-gray-800 px-2 py-1 rounded-full">🥈 2nd</span>}
                    {idx === 2 && <span className="text-xs bg-orange-200 text-orange-800 px-2 py-1 rounded-full">🥉 3rd</span>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-gray-800">📊 Recent Results</h2>
          <div className="grid gap-4">
            {recent.length === 0 && <div className="p-8 text-center bg-white rounded-lg text-gray-500">No results yet.</div>}
            {recent.map(r => {
              const profile = profilesMap.get(r.user_id) ?? profilesMap.get(r.user_email);
              const name = profile?.username ?? profile?.display_name ?? r.user_email ?? r.user_id ?? 'anonymous';
              return (
                <div key={r.id} className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition flex justify-between items-center">
                  <div>
                    <div className="font-semibold text-gray-800">{name}</div>
                    <div className="text-sm text-gray-500">{r.quiz} • {new Date(r.created_at).toLocaleString()}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-600">{r.score}{r.max_score ? ` / ${r.max_score}` : ''}</div>
                    {r.max_score && <div className="text-xs text-gray-500">{Math.round((r.score / r.max_score) * 100)}% correct</div>}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
