import React, { useState, useEffect } from 'react';
import { Search, Users, Target, TrendingUp, DollarSign, Calendar, Star, Filter } from 'lucide-react';

const FantasyFootballSystem = () => {
  const [activeTab, setActiveTab] = useState('rankings');
  const [selectedPosition, setSelectedPosition] = useState('ALL');
  const [draftSettings, setDraftSettings] = useState({
    leagueSize: 10,
    draftPosition: 5,
    currentRound: 1,
    ppr: true
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [draftedPlayers, setDraftedPlayers] = useState([]);
  const [myTeam, setMyTeam] = useState([]);
  const [salaryCapBudget, setSalaryCapBudget] = useState(50000);
  const [selectedLineup, setSelectedLineup] = useState([]);

  // Current 2025 player rankings based on recent expert consensus
  const playerRankings = [
    // Top tier players
    { name: "Ja'Marr Chase", position: "WR", team: "CIN", overallRank: 1, posRank: 1, projPoints: 320, adp: 1.2, salary: 9800, tier: 1 },
    { name: "Bijan Robinson", position: "RB", team: "ATL", overallRank: 2, posRank: 1, projPoints: 310, adp: 1.8, salary: 9600, tier: 1 },
    { name: "Justin Jefferson", position: "WR", team: "MIN", overallRank: 3, posRank: 2, projPoints: 315, adp: 2.1, salary: 9500, tier: 1 },
    { name: "Saquon Barkley", position: "RB", team: "PHI", overallRank: 4, posRank: 2, projPoints: 305, adp: 2.4, salary: 9400, tier: 1 },
    { name: "Jahmyr Gibbs", position: "RB", team: "DET", overallRank: 5, posRank: 3, projPoints: 300, adp: 2.8, salary: 9200, tier: 1 },
    { name: "CeeDee Lamb", position: "WR", team: "DAL", overallRank: 6, posRank: 3, projPoints: 308, adp: 3.2, salary: 9100, tier: 1 },
    { name: "Puka Nacua", position: "WR", team: "LAR", overallRank: 7, posRank: 4, projPoints: 295, adp: 3.5, salary: 8900, tier: 1 },
    { name: "Malik Nabers", position: "WR", team: "NYG", overallRank: 8, posRank: 5, projPoints: 290, adp: 3.8, salary: 8800, tier: 1 },
    { name: "Christian McCaffrey", position: "RB", team: "SF", overallRank: 9, posRank: 4, projPoints: 285, adp: 4.2, salary: 8700, tier: 1 },
    { name: "Amon-Ra St. Brown", position: "WR", team: "DET", overallRank: 10, posRank: 6, projPoints: 288, adp: 4.5, salary: 8600, tier: 1 },
    
    // Second tier
    { name: "Josh Allen", position: "QB", team: "BUF", overallRank: 11, posRank: 1, projPoints: 380, adp: 5.2, salary: 8400, tier: 2 },
    { name: "Tyreek Hill", position: "WR", team: "MIA", overallRank: 12, posRank: 7, projPoints: 285, adp: 5.5, salary: 8300, tier: 2 },
    { name: "Kyren Williams", position: "RB", team: "LAR", overallRank: 13, posRank: 5, projPoints: 280, adp: 5.8, salary: 8200, tier: 2 },
    { name: "Lamar Jackson", position: "QB", team: "BAL", overallRank: 14, posRank: 2, projPoints: 375, adp: 6.1, salary: 8100, tier: 2 },
    { name: "Brock Bowers", position: "TE", team: "LV", overallRank: 15, posRank: 1, projPoints: 220, adp: 6.5, salary: 7900, tier: 2 },
    { name: "Garrett Wilson", position: "WR", team: "NYJ", overallRank: 16, posRank: 8, projPoints: 275, adp: 6.8, salary: 7800, tier: 2 },
    { name: "A.J. Brown", position: "WR", team: "PHI", overallRank: 17, posRank: 9, projPoints: 270, adp: 7.2, salary: 7700, tier: 2 },
    { name: "Derrick Henry", position: "RB", team: "BAL", overallRank: 18, posRank: 6, projPoints: 275, adp: 7.5, salary: 7600, tier: 2 },
    { name: "Mike Evans", position: "WR", team: "TB", overallRank: 19, posRank: 10, projPoints: 268, adp: 7.8, salary: 7500, tier: 2 },
    { name: "Davante Adams", position: "WR", team: "LV", overallRank: 20, posRank: 11, projPoints: 265, adp: 8.1, salary: 7400, tier: 2 },
    
    // Third tier
    { name: "Joe Burrow", position: "QB", team: "CIN", overallRank: 21, posRank: 3, projPoints: 365, adp: 8.5, salary: 7300, tier: 3 },
    { name: "Kenneth Walker III", position: "RB", team: "SEA", overallRank: 22, posRank: 7, projPoints: 260, adp: 8.8, salary: 7200, tier: 3 },
    { name: "Chris Olave", position: "WR", team: "NO", overallRank: 23, posRank: 12, projPoints: 255, adp: 9.2, salary: 7100, tier: 3 },
    { name: "DJ Moore", position: "WR", team: "CHI", overallRank: 24, posRank: 13, projPoints: 250, adp: 9.5, salary: 7000, tier: 3 },
    { name: "Travis Kelce", position: "TE", team: "KC", overallRank: 25, posRank: 2, projPoints: 210, adp: 9.8, salary: 6900, tier: 3 },
    
    // Additional players for depth
    { name: "Stefon Diggs", position: "WR", team: "HOU", overallRank: 26, posRank: 14, projPoints: 248, adp: 10.2, salary: 6800, tier: 3 },
    { name: "Josh Jacobs", position: "RB", team: "GB", overallRank: 27, posRank: 8, projPoints: 255, adp: 10.5, salary: 6700, tier: 3 },
    { name: "Dak Prescott", position: "QB", team: "DAL", overallRank: 28, posRank: 4, projPoints: 355, adp: 10.8, salary: 6600, tier: 3 },
    { name: "Deebo Samuel", position: "WR", team: "SF", overallRank: 29, posRank: 15, projPoints: 245, adp: 11.2, salary: 6500, tier: 3 },
    { name: "Jonathan Taylor", position: "RB", team: "IND", overallRank: 30, posRank: 9, projPoints: 250, adp: 11.5, salary: 6400, tier: 3 },
    
    // More depth players
    { name: "Tua Tagovailoa", position: "QB", team: "MIA", overallRank: 31, posRank: 5, projPoints: 340, adp: 12.1, salary: 6300, tier: 4 },
    { name: "Aaron Jones", position: "RB", team: "MIN", overallRank: 32, posRank: 10, projPoints: 240, adp: 12.5, salary: 6200, tier: 4 },
    { name: "Keenan Allen", position: "WR", team: "CHI", overallRank: 33, posRank: 16, projPoints: 240, adp: 12.8, salary: 6100, tier: 4 },
    { name: "George Kittle", position: "TE", team: "SF", overallRank: 34, posRank: 3, projPoints: 195, adp: 13.2, salary: 6000, tier: 4 },
    { name: "Jayden Daniels", position: "QB", team: "WAS", overallRank: 35, posRank: 6, projPoints: 335, adp: 13.5, salary: 5900, tier: 4 },
    
    // Additional depth for all positions
    { name: "De'Von Achane", position: "RB", team: "MIA", overallRank: 36, posRank: 11, projPoints: 235, adp: 14.2, salary: 5800, tier: 4 },
    { name: "Terry McLaurin", position: "WR", team: "WAS", overallRank: 37, posRank: 17, projPoints: 235, adp: 14.5, salary: 5700, tier: 4 },
    { name: "Jalen Hurts", position: "QB", team: "PHI", overallRank: 38, posRank: 7, projPoints: 330, adp: 15.1, salary: 5600, tier: 4 },
    { name: "James Cook", position: "RB", team: "BUF", overallRank: 39, posRank: 12, projPoints: 230, adp: 15.5, salary: 5500, tier: 4 },
    { name: "Amari Cooper", position: "WR", team: "CLE", overallRank: 40, posRank: 18, projPoints: 230, adp: 16.2, salary: 5400, tier: 4 },
    
    // Defense and Kicker examples
    { name: "49ers D/ST", position: "DST", team: "SF", overallRank: 180, posRank: 1, projPoints: 145, adp: 180, salary: 3200, tier: 5 },
    { name: "Cowboys D/ST", position: "DST", team: "DAL", overallRank: 181, posRank: 2, projPoints: 140, adp: 185, salary: 3100, tier: 5 },
    { name: "Justin Tucker", position: "K", team: "BAL", overallRank: 200, posRank: 1, projPoints: 130, adp: 200, salary: 2800, tier: 5 },
    { name: "Harrison Butker", position: "K", team: "KC", overallRank: 201, posRank: 2, projPoints: 125, adp: 205, salary: 2700, tier: 5 }
  ];

  const filteredPlayers = playerRankings.filter(player => {
    const matchesPosition = selectedPosition === 'ALL' || player.position === selectedPosition;
    const matchesSearch = player.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         player.team.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesPosition && matchesSearch && !draftedPlayers.includes(player.name);
  });

  const getNextPick = () => {
    const { leagueSize, draftPosition, currentRound } = draftSettings;
    if (currentRound % 2 === 1) {
      return ((currentRound - 1) * leagueSize) + draftPosition;
    } else {
      return (currentRound * leagueSize) - draftPosition + 1;
    }
  };

  const getPicksUntilNext = () => {
    const nextPick = getNextPick();
    const totalPicks = (draftSettings.currentRound - 1) * draftSettings.leagueSize + draftedPlayers.length;
    return Math.max(0, nextPick - totalPicks - 1);
  };

  const draftPlayer = (player) => {
    setDraftedPlayers([...draftedPlayers, player.name]);
    setMyTeam([...myTeam, player]);
  };

  const addToLineup = (player) => {
    const totalSalary = selectedLineup.reduce((sum, p) => sum + p.salary, 0);
    if (totalSalary + player.salary <= salaryCapBudget) {
      setSelectedLineup([...selectedLineup, player]);
    }
  };

  const removeFromLineup = (player) => {
    setSelectedLineup(selectedLineup.filter(p => p.name !== player.name));
  };

  const getTierColor = (tier) => {
    switch (tier) {
      case 1: return 'bg-red-100 text-red-800';
      case 2: return 'bg-orange-100 text-orange-800';
      case 3: return 'bg-yellow-100 text-yellow-800';
      case 4: return 'bg-green-100 text-green-800';
      case 5: return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPositionNeeds = () => {
    const positions = { QB: 0, RB: 0, WR: 0, TE: 0, K: 0, DST: 0 };
    myTeam.forEach(player => positions[player.position]++);
    
    return {
      QB: Math.max(0, 1 - positions.QB),
      RB: Math.max(0, 3 - positions.RB), // 2 RB + 1 Flex
      WR: Math.max(0, 4 - positions.WR), // 2 WR + 1 WR/TE + 1 Flex
      TE: Math.max(0, 1 - positions.TE),
      K: Math.max(0, 1 - positions.K),
      DST: Math.max(0, 1 - positions.DST)
    };
  };

  const renderDraftAssistant = () => (
    <div className="space-y-6">
      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-3">Draft Settings</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">League Size</label>
            <select 
              value={draftSettings.leagueSize} 
              onChange={(e) => setDraftSettings({...draftSettings, leagueSize: parseInt(e.target.value)})}
              className="w-full p-2 border rounded"
            >
              <option value={10}>10 Team</option>
              <option value={12}>12 Team</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Your Draft Position</label>
            <select 
              value={draftSettings.draftPosition} 
              onChange={(e) => setDraftSettings({...draftSettings, draftPosition: parseInt(e.target.value)})}
              className="w-full p-2 border rounded"
            >
              {[...Array(draftSettings.leagueSize)].map((_, i) => (
                <option key={i} value={i + 1}>{i + 1}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="bg-green-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Draft Status</h3>
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div>
            <span className="font-medium">Current Round:</span> {draftSettings.currentRound}
          </div>
          <div>
            <span className="font-medium">Next Pick:</span> {getNextPick()}
          </div>
          <div>
            <span className="font-medium">Picks Until Your Turn:</span> {getPicksUntilNext()}
          </div>
        </div>
      </div>

      <div className="bg-yellow-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Position Needs</h3>
        <div className="grid grid-cols-6 gap-2 text-sm">
          {Object.entries(getPositionNeeds()).map(([pos, need]) => (
            <div key={pos} className={`p-2 rounded text-center ${need > 0 ? 'bg-red-200' : 'bg-green-200'}`}>
              <div className="font-medium">{pos}</div>
              <div>{need > 0 ? `Need ${need}` : 'Set'}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg border">
        <h3 className="text-lg font-semibold mb-3">My Team ({myTeam.length})</h3>
        <div className="space-y-2">
          {myTeam.map((player, idx) => (
            <div key={idx} className="flex justify-between items-center p-2 bg-gray-50 rounded">
              <div>
                <span className="font-medium">{player.name}</span>
                <span className="text-sm text-gray-600 ml-2">{player.position} - {player.team}</span>
              </div>
              <span className="text-sm text-gray-500">Proj: {player.projPoints}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderDraftKingsOptimizer = () => {
    const totalSalary = selectedLineup.reduce((sum, p) => sum + p.salary, 0);
    const remainingBudget = salaryCapBudget - totalSalary;
    
    return (
      <div className="space-y-6">
        <div className="bg-purple-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-3">DraftKings Lineup Builder</h3>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <span className="font-medium">Total Salary:</span> ${totalSalary.toLocaleString()}
            </div>
            <div>
              <span className="font-medium">Remaining:</span> ${remainingBudget.toLocaleString()}
            </div>
            <div>
              <span className="font-medium">Budget:</span> ${salaryCapBudget.toLocaleString()}
            </div>
          </div>
          <div className="mt-2">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-purple-600 h-2 rounded-full" 
                style={{ width: `${(totalSalary / salaryCapBudget) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border">
          <h3 className="text-lg font-semibold mb-3">Current Lineup ({selectedLineup.length}/9)</h3>
          <div className="space-y-2">
            {selectedLineup.map((player, idx) => (
              <div key={idx} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <div>
                  <span className="font-medium">{player.name}</span>
                  <span className="text-sm text-gray-600 ml-2">{player.position} - {player.team}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm">${player.salary.toLocaleString()}</span>
                  <button 
                    onClick={() => removeFromLineup(player)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-3">DraftKings Strategy Tips</h3>
          <ul className="text-sm space-y-1">
            <li>• Target 2-3 high-priced studs ($8,000+ each)</li>
            <li>• Look for value plays in the $5,000-$6,500 range</li>
            <li>• Stack QB with their WR/TE for correlation</li>
            <li>• Consider game script and weather conditions</li>
            <li>• Target players with high TD upside</li>
          </ul>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Fantasy Football Draft & Lineup System 2025</h1>
        <p className="text-gray-600">ESPN Snake Draft Assistant & DraftKings Optimizer</p>
      </div>

      <div className="mb-6">
        <nav className="flex space-x-4">
          <button
            onClick={() => setActiveTab('rankings')}
            className={`px-4 py-2 rounded-lg font-medium ${
              activeTab === 'rankings' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            <Target className="inline w-4 h-4 mr-2" />
            Player Rankings
          </button>
          <button
            onClick={() => setActiveTab('draft')}
            className={`px-4 py-2 rounded-lg font-medium ${
              activeTab === 'draft' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            <Users className="inline w-4 h-4 mr-2" />
            Draft Assistant
          </button>
          <button
            onClick={() => setActiveTab('draftkings')}
            className={`px-4 py-2 rounded-lg font-medium ${
              activeTab === 'draftkings' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            <DollarSign className="inline w-4 h-4 mr-2" />
            DraftKings Optimizer
          </button>
        </nav>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {activeTab === 'rankings' && (
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">2025 Player Rankings</h2>
                <div className="flex space-x-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search players..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 border rounded-lg"
                    />
                  </div>
                  <select
                    value={selectedPosition}
                    onChange={(e) => setSelectedPosition(e.target.value)}
                    className="p-2 border rounded-lg"
                  >
                    <option value="ALL">All Positions</option>
                    <option value="QB">QB</option>
                    <option value="RB">RB</option>
                    <option value="WR">WR</option>
                    <option value="TE">TE</option>
                    <option value="K">K</option>
                    <option value="DST">DST</option>
                  </select>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Rank</th>
                      <th className="text-left p-2">Player</th>
                      <th className="text-left p-2">Pos</th>
                      <th className="text-left p-2">Team</th>
                      <th className="text-left p-2">Proj</th>
                      <th className="text-left p-2">ADP</th>
                      <th className="text-left p-2">Salary</th>
                      <th className="text-left p-2">Tier</th>
                      <th className="text-left p-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPlayers.map((player, idx) => (
                      <tr key={idx} className="border-b hover:bg-gray-50">
                        <td className="p-2 font-medium">{player.overallRank}</td>
                        <td className="p-2">
                          <div className="font-medium">{player.name}</div>
                          <div className="text-xs text-gray-500">{player.position}{player.posRank}</div>
                        </td>
                        <td className="p-2">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            player.position === 'QB' ? 'bg-purple-100 text-purple-800' :
                            player.position === 'RB' ? 'bg-green-100 text-green-800' :
                            player.position === 'WR' ? 'bg-blue-100 text-blue-800' :
                            player.position === 'TE' ? 'bg-orange-100 text-orange-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {player.position}
                          </span>
                        </td>
                        <td className="p-2">{player.team}</td>
                        <td className="p-2">{player.projPoints}</td>
                        <td className="p-2">{player.adp}</td>
                        <td className="p-2">${player.salary.toLocaleString()}</td>
                        <td className="p-2">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${getTierColor(player.tier)}`}>
                            Tier {player.tier}
                          </span>
                        </td>
                        <td className="p-2">
                          <div className="flex space-x-1">
                            <button
                              onClick={() => draftPlayer(player)}
                              className="text-blue-600 hover:text-blue-800 text-xs"
                            >
                              Draft
                            </button>
                            <button
                              onClick={() => addToLineup(player)}
                              className="text-green-600 hover:text-green-800 text-xs"
                            >
                              Add
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'draft' && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Snake Draft Assistant</h2>
              {renderDraftAssistant()}
            </div>
          )}

          {activeTab === 'draftkings' && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">DraftKings Salary Cap</h2>
              {renderDraftKingsOptimizer()}
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Draft Strategy Tips</h3>
            <div className="space-y-3 text-sm">
              <div className="p-3 bg-blue-50 rounded">
                <h4 className="font-medium text-blue-800">Early Rounds (1-3)</h4>
                <p className="text-blue-700">Target elite RB/WR. Avoid QB/TE unless exceptional value.</p>
              </div>
              <div className="p-3 bg-green-50 rounded">
                <h4 className="font-medium text-green-800">Middle Rounds (4-8)</h4>
                <p className="text-green-700">Fill RB2, WR2, consider top QB/TE. Look for upside plays.</p>
              </div>
              <div className="p-3 bg-yellow-50 rounded">
                <h4 className="font-medium text-yellow-800">Late Rounds (9+)</h4>
                <p className="text-yellow-700">Handcuffs, sleepers, DST, K. Target high-upside backups.</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Key Metrics</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span>Total Players Drafted:</span>
                <span className="font-medium">{draftedPlayers.length}</span>
              </div>
              <div className="flex justify-between">
                <span>My Team Size:</span>
                <span className="font-medium">{myTeam.length}/16</span>
              </div>
              <div className="flex justify-between">
                <span>Current Round:</span>
                <span className="font-medium">{Math.ceil((draftedPlayers.length + 1) / draftSettings.leagueSize)}</span>
              </div>
              <div className="flex justify-between">
                <span>DK Lineup Size:</span>
                <span className="font-medium">{selectedLineup.length}/9</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Position Priorities</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center">
                <span>1. Elite RB/WR</span>
                <Star className="w-4 h-4 text-yellow-500" />
              </div>
              <div className="flex justify-between items-center">
                <span>2. RB/WR Depth</span>
                <TrendingUp className="w-4 h-4 text-blue-500" />
              </div>
              <div className="flex justify-between items-center">
                <span>3. QB (if elite)</span>
                <Target className="w-4 h-4 text-purple-500" />
              </div>
              <div className="flex justify-between items-center">
                <span>4. TE (if top tier)</span>
                <Filter className="w-4 h-4 text-orange-500" />
              </div>
              <div className="flex justify-between items-center">
                <span>5. DST & K (last)</span>
                <Calendar className="w-4 h-4 text-gray-500" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Advanced Analytics</h3>
            <div className="space-y-3 text-sm">
              <div className="p-3 bg-red-50 rounded">
                <h4 className="font-medium text-red-800">Injury Risk</h4>
                <p className="text-red-700">Monitor preseason injuries and target handcuffs for fragile players.</p>
              </div>
              <div className="p-3 bg-purple-50 rounded">
                <h4 className="font-medium text-purple-800">Strength of Schedule</h4>
                <p className="text-purple-700">Consider playoff schedule weeks 15-17 for key players.</p>
              </div>
              <div className="p-3 bg-indigo-50 rounded">
                <h4 className="font-medium text-indigo-800">Target Share</h4>
                <p className="text-indigo-700">Look for 20%+ target share for WRs, 15%+ for RBs in passing game.</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <button
                onClick={() => setDraftSettings({...draftSettings, currentRound: draftSettings.currentRound + 1})}
                className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Next Round
              </button>
              <button
                onClick={() => {
                  setDraftedPlayers([]);
                  setMyTeam([]);
                  setSelectedLineup([]);
                  setDraftSettings({...draftSettings, currentRound: 1});
                }}
                className="w-full p-2 bg-gray-600 text-white rounded hover:bg-gray-700"
              >
                Reset Draft
              </button>
              <button
                onClick={() => setSelectedLineup([])}
                className="w-full p-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Clear DK Lineup
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FantasyFootballSystem;