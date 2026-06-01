'use client';

import React, { useState, useEffect } from 'react';

interface Node {
  name: string;
  status: 'healthy' | 'degraded' | 'offline';
  url: string;
  uptime: number;
  responseTime: number;
  lastChecked: string;
  role: 'leader' | 'follower';
}

interface CollectiveStatus {
  status: 'healthy' | 'warning' | 'critical';
  nodes: Node[];
  lastSync: string;
  deploymentStatus: string;
  commandQueue: number;
}

export default function MasterDashboard() {
  const [collectiveStatus, setCollectiveStatus] = useState<CollectiveStatus | null>(null);
  const [selectedNode, setSelectedNode] = useState<string>('king-ai-voice');
  const [isDeploying, setIsDeploying] = useState(false);

  useEffect(() => {
    // Simulate fetching collective status
    const mockStatus: CollectiveStatus = {
      status: 'healthy',
      nodes: [
        {
          name: 'king-ai-voice',
          status: 'healthy',
          url: 'https://king-ai-voice.vercel.app',
          uptime: 99.98,
          responseTime: 45,
          lastChecked: new Date().toISOString(),
          role: 'leader'
        },
        {
          name: 'sovereign-aura-nexus',
          status: 'healthy',
          url: 'https://sovereign-aura-nexus.vercel.app',
          uptime: 99.95,
          responseTime: 52,
          lastChecked: new Date().toISOString(),
          role: 'follower'
        },
        {
          name: 'omega-flux-studio',
          status: 'healthy',
          url: 'https://omega-flux-studio.vercel.app',
          uptime: 99.92,
          responseTime: 58,
          lastChecked: new Date().toISOString(),
          role: 'follower'
        },
        {
          name: 'royal-scribe-studio',
          status: 'healthy',
          url: 'https://royal-scribe-studio.vercel.app',
          uptime: 99.90,
          responseTime: 61,
          lastChecked: new Date().toISOString(),
          role: 'follower'
        }
      ],
      lastSync: new Date().toISOString(),
      deploymentStatus: 'all_live',
      commandQueue: 0
    };
    setCollectiveStatus(mockStatus);
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy':
        return '🟢';
      case 'degraded':
        return '🟡';
      case 'offline':
        return '🔴';
      default:
        return '⚪';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
        return 'bg-green-500/20 border-green-500';
      case 'degraded':
        return 'bg-yellow-500/20 border-yellow-500';
      case 'offline':
        return 'bg-red-500/20 border-red-500';
      default:
        return 'bg-gray-500/20 border-gray-500';
    }
  };

  if (!collectiveStatus) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent mb-2">
            🌐 AI Collective System
          </h1>
          <p className="text-gray-400">Master Control Hub - 4 Node Collective</p>
        </div>

        {/* Overall Status */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-slate-700/50 border border-slate-600 rounded-lg p-4">
            <div className="text-sm text-gray-400 mb-2">Collective Status</div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">{getStatusIcon(collectiveStatus.status)}</span>
              <span className="text-xl font-semibold capitalize">{collectiveStatus.status}</span>
            </div>
          </div>
          <div className="bg-slate-700/50 border border-slate-600 rounded-lg p-4">
            <div className="text-sm text-gray-400 mb-2">Active Nodes</div>
            <div className="text-2xl font-bold text-cyan-400">
              {collectiveStatus.nodes.filter((n) => n.status !== 'offline').length}/4
            </div>
          </div>
          <div className="bg-slate-700/50 border border-slate-600 rounded-lg p-4">
            <div className="text-sm text-gray-400 mb-2">Deployment</div>
            <div className="text-lg font-semibold text-green-400">✅ All Live</div>
          </div>
          <div className="bg-slate-700/50 border border-slate-600 rounded-lg p-4">
            <div className="text-sm text-gray-400 mb-2">Commands</div>
            <div className="text-2xl font-bold text-purple-400">{collectiveStatus.commandQueue}</div>
          </div>
        </div>

        {/* Nodes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {collectiveStatus.nodes.map((node) => (
            <div
              key={node.name}
              onClick={() => setSelectedNode(node.name)}
              className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${getStatusColor(node.status)} ${
                selectedNode === node.name ? 'ring-2 ring-cyan-400' : ''
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="font-semibold capitalize">{node.name.replace(/-/g, ' ')}</div>
                  <div className="text-xs text-gray-400 capitalize">{node.role}</div>
                </div>
                <span className="text-2xl">{getStatusIcon(node.status)}</span>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Uptime</span>
                  <span className="font-mono">{node.uptime}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Response</span>
                  <span className="font-mono">{node.responseTime}ms</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Selected Node Details */}
        {selectedNode && (
          <div className="bg-slate-700/50 border border-slate-600 rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4">
              {collectiveStatus.nodes.find((n) => n.name === selectedNode)?.name.replace(/-/g, ' ')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">Deployment Info</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Live URL</span>
                    <a
                      href={collectiveStatus.nodes.find((n) => n.name === selectedNode)?.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-400 hover:underline text-sm"
                    >
                      Visit →
                    </a>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Last Checked</span>
                    <span className="text-sm">
                      {new Date(
                        collectiveStatus.nodes.find((n) => n.name === selectedNode)?.lastChecked || ''
                      ).toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3">Actions</h3>
                <button
                  onClick={() => setIsDeploying(true)}
                  disabled={isDeploying}
                  className="w-full bg-cyan-600 hover:bg-cyan-700 disabled:opacity-50 text-white font-semibold py-2 px-4 rounded transition-colors"
                >
                  {isDeploying ? '🔄 Deploying...' : '🚀 Trigger Deploy'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Commands Console */}
        <div className="bg-slate-700/50 border border-slate-600 rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">📡 Command Console</h2>
          <div className="bg-slate-900 border border-slate-600 rounded p-4 mb-4 min-h-24 max-h-48 overflow-y-auto font-mono text-sm">
            <div className="text-green-400">$ pnpm run sync:collective</div>
            <div className="text-green-400">✅ Config synced to all 4 nodes</div>
            <div className="text-gray-500 text-xs mt-2">Ready for next command...</div>
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Enter collective command..."
              className="flex-1 bg-slate-800 border border-slate-600 rounded px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500"
            />
            <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded transition-colors">
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
