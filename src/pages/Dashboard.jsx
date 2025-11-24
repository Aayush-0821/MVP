import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from '../context/AuthProvider';

export default function Dashboard() {
  const { user, initializing } = useAuth();
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
          const lastPlayed = (myRes ?? []).sort((a, b) => new Date(b.created_at) - new Date(a.created_at))[0]?.created_at ?? null;
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

  if (initializing) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl max-w-md w-full text-center border border-gray-200 dark:border-gray-700">
          <div className="text-6xl mb-6">🔒</div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Access Denied</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8 text-lg">
            Please log in to view your dashboard and track your progress.
          </p>
          <div className="flex flex-col gap-3">
            <a
              href="/login"
              className="inline-block w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-3 px-6 rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-200"
            >
              Log In
            </a>
            <a
              href="/login?mode=signup"
              className="inline-block w-full bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 border-2 border-blue-600 dark:border-blue-400 font-bold py-3 px-6 rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-200"
            >
              Sign Up
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50 dark:from-black dark:via-gray-900 dark:to-gray-800 p-6 transition-colors">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#4A70A9] to-[#8FABD4] bg-clip-text text-transparent">
            Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">Track your progress and compete with others</p>
        </div>

        {/* Profile Card */}
        <div className="mb-10 p-8 bg-gradient-to-br from-[#4A70A9] to-[#8FABD4] rounded-2xl shadow-2xl text-white border border-[#8FABD4]/20">
          <div className="flex flex-col md:flex-row items-start justify-between gap-6">
            <div className="flex items-center gap-6">
              <img
                src={myProfile?.avatar_url ?? user.user_metadata?.avatar_url ?? `https://ui-avatars.com/api/?name=${encodeURIComponent(myProfile?.display_name ?? myProfile?.full_name ?? user.email)}&background=4A70A9&color=fff&rounded=true&size=120`}
                alt="avatar"
                className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
              />
              <div>
                <h2 className="text-3xl font-bold">{myProfile?.display_name ?? myProfile?.full_name ?? user.email}</h2>
                <p className="text-white/80 text-sm mt-1">{myProfile?.username ?? 'No username'}</p>
                <p className="text-white/70">{user.email}</p>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white/20 backdrop-blur-sm p-6 rounded-xl text-center border border-white/30 hover:bg-white/30 transition-all">
              <div className="text-4xl font-bold">{myStats?.totalGames ?? 0}</div>
              <div className="text-white/90 text-sm mt-1 font-medium">Total Games</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm p-6 rounded-xl text-center border border-white/30 hover:bg-white/30 transition-all">
              <div className="text-4xl font-bold">{myStats?.best ?? 0}</div>
              <div className="text-white/90 text-sm mt-1 font-medium">Best Score</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm p-6 rounded-xl text-center border border-white/30 hover:bg-white/30 transition-all">
              <div className="text-4xl font-bold">{myStats?.totalPoints ?? 0}</div>
              <div className="text-white/90 text-sm mt-1 font-medium">Total Points</div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Leaderboard */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-black dark:text-white flex items-center gap-2">
              🏆 Leaderboard
            </h2>
            {loading ? (
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 text-center">
                <div className="animate-pulse text-gray-500 dark:text-gray-400">Loading leaderboard...</div>
              </div>
            ) : (
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-200/50 dark:border-gray-700/50">
                {leaderboard.length === 0 && <div className="p-8 text-center text-gray-500 dark:text-gray-400">No scores yet.</div>}
                {leaderboard.map((row, idx) => (
                  <div key={idx} className={`p-4 flex justify-between items-center border-b last:border-b-0 dark:border-gray-700 transition-all hover:bg-[#8FABD4]/5 dark:hover:bg-[#8FABD4]/10 ${idx < 3 ? 'bg-gradient-to-r from-[#8FABD4]/10 to-transparent dark:from-[#8FABD4]/20' : ''}`}>
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full font-bold flex items-center justify-center shadow-md ${idx === 0 ? 'bg-gradient-to-br from-yellow-400 to-yellow-600 text-white' :
                        idx === 1 ? 'bg-gradient-to-br from-gray-300 to-gray-500 text-white' :
                          idx === 2 ? 'bg-gradient-to-br from-orange-400 to-orange-600 text-white' :
                            'bg-gradient-to-br from-[#4A70A9] to-[#8FABD4] text-white'
                        }`}>
                        {idx + 1}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-800 dark:text-white">{row.username ?? row.display_name ?? row.user_email ?? 'Anonymous'}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">{new Date(row.latest_at).toLocaleDateString()}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-[#4A70A9] dark:text-[#8FABD4]">{row.best_score}</div>
                      {idx === 0 && <span className="text-xs bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300 px-2 py-1 rounded-full">👑 Leader</span>}
                      {idx === 1 && <span className="text-xs bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300 px-2 py-1 rounded-full">🥈 2nd</span>}
                      {idx === 2 && <span className="text-xs bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300 px-2 py-1 rounded-full">🥉 3rd</span>}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Recent Results */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-black dark:text-white flex items-center gap-2">
              📊 Recent Results
            </h2>
            <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
              {recent.length === 0 && (
                <div className="p-8 text-center bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 text-gray-500 dark:text-gray-400">
                  No results yet.
                </div>
              )}
              {recent.map(r => {
                const profile = profilesMap.get(r.user_id) ?? profilesMap.get(r.user_email);
                const name = profile?.username ?? profile?.display_name ?? r.user_email ?? r.user_id ?? 'anonymous';
                return (
                  <div key={r.id} className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all flex justify-between items-center border border-gray-200/50 dark:border-gray-700/50 hover:border-[#8FABD4]/50 dark:hover:border-[#8FABD4]/50">
                    <div>
                      <div className="font-semibold text-gray-800 dark:text-white">{name}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{r.quiz} • {new Date(r.created_at).toLocaleString()}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-[#4A70A9] dark:text-[#8FABD4]">{r.score}{r.max_score ? ` / ${r.max_score}` : ''}</div>
                      {r.max_score && <div className="text-xs text-gray-500 dark:text-gray-400">{Math.round((r.score / r.max_score) * 100)}% correct</div>}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
