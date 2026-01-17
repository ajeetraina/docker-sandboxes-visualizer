import React, { useState, useEffect } from 'react';

const sandboxData = {
  name: "claude-sandbox-2026-01-17-071211",
  status: "running",
  workspace: "/Users/ajeetsraina/sandbox-testing",
  template: "docker/sandbox-templates:claude-code",
  base: "ubuntu:questing",
  layers: [
    {
      id: "host",
      name: "Your Host Machine",
      type: "host",
      color: "#1a1a2e",
      icon: "💻",
      description: "macOS / Windows / Linux",
      details: [
        "Full filesystem access",
        "~/.ssh credentials",
        "~/.aws credentials", 
        "All environment variables",
        "All running processes"
      ],
      protected: true,
      size: "Your entire system"
    },
    {
      id: "docker-vm",
      name: "Docker Desktop VM",
      type: "isolation",
      color: "#16213e",
      icon: "🛡️",
      description: "First isolation boundary",
      details: [
        "Hypervisor isolation (HyperKit/WSL2)",
        "Separate kernel from host",
        "Resource limits enforced",
        "Network namespace isolation"
      ],
      protected: true,
      size: "Lightweight VM"
    },
    {
      id: "sandbox-container",
      name: "Sandbox Container",
      type: "container",
      color: "#0f3460",
      icon: "📦",
      description: "Isolated execution environment",
      details: [
        "Based on ubuntu:questing (25.10)",
        "Read-only base filesystem",
        "Namespaced process tree",
        "Controlled network access",
        "Persisted state via volumes"
      ],
      protected: false,
      size: "~150 MB base"
    },
    {
      id: "workspace-mount",
      name: "Workspace Mount",
      type: "mount",
      color: "#1a5f7a",
      icon: "📁",
      description: "/Users/ajeetsraina/sandbox-testing",
      details: [
        "Bi-directional sync with host",
        "Same absolute paths inside & outside",
        "Only this directory accessible",
        "Git config auto-injected",
        "Changes persist to host"
      ],
      protected: false,
      size: "Your project files"
    },
    {
      id: "ai-agent",
      name: "AI Agent (Claude)",
      type: "agent",
      color: "#3282b8",
      icon: "🤖",
      description: "Claude Code running safely",
      details: [
        "Full coding capabilities",
        "Can install packages",
        "Can run tests",
        "Can execute commands",
        "CANNOT escape sandbox"
      ],
      protected: false,
      size: "Claude Code CLI"
    }
  ],
  blocked: [
    { path: "/Users/ajeetsraina/*", reason: "Other directories" },
    { path: "~/.ssh", reason: "SSH keys" },
    { path: "~/.aws", reason: "AWS credentials" },
    { path: "~/.config", reason: "Config files" },
    { path: "/etc/passwd", reason: "System files" }
  ],
  allowed: [
    { path: "/Users/ajeetsraina/sandbox-testing", reason: "Project workspace" },
    { path: "Git identity", reason: "Auto-injected" },
    { path: "npm/pip packages", reason: "Persisted in volume" }
  ]
};

const styles = `
  * { margin: 0; padding: 0; box-sizing: border-box; }
  
  @keyframes gridMove {
    0% { transform: translate(0, 0); }
    100% { transform: translate(50px, 50px); }
  }
  
  @keyframes slideIn {
    from { opacity: 0; transform: translateY(30px) scale(0.95); }
    to { opacity: 1; transform: translateY(0) scale(1); }
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }
  
  @keyframes securityScan {
    0% { background-position: 0% 0%; }
    100% { background-position: 200% 0%; }
  }
  
  @keyframes blink {
    50% { opacity: 0; }
  }
  
  @keyframes pulse {
    0%, 100% { box-shadow: 0 0 20px rgba(50, 130, 184, 0.3); }
    50% { box-shadow: 0 0 40px rgba(50, 130, 184, 0.6); }
  }
`;

export default function App() {
  const [selectedLayer, setSelectedLayer] = useState(null);
  const [isAnimating, setIsAnimating] = useState(true);
  const [showBlocked, setShowBlocked] = useState(false);
  const [pulseIndex, setPulseIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulseIndex(prev => (prev + 1) % sandboxData.layers.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setIsAnimating(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <style>{styles}</style>
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 50%, #0f0f1a 100%)',
        fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
        color: '#e0e0e0',
        padding: '20px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Animated background grid */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(50, 130, 184, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(50, 130, 184, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          animation: 'gridMove 20s linear infinite'
        }} />

        {/* Header */}
        <div style={{
          position: 'relative',
          zIndex: 10,
          textAlign: 'center',
          marginBottom: '40px'
        }}>
          <h1 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(1.8rem, 5vw, 3rem)',
            fontWeight: 700,
            background: 'linear-gradient(135deg, #3282b8 0%, #0f4c75 50%, #1a5f7a 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: '10px',
            letterSpacing: '-1px'
          }}>
            🐳 Docker Sandbox Architecture
          </h1>
          <p style={{
            color: '#6b7280',
            fontSize: '1.1rem'
          }}>
            <span style={{ color: '#22c55e' }}>●</span> {sandboxData.name}
          </p>
        </div>

        {/* Main content */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) minmax(300px, 400px)',
          gap: '40px',
          maxWidth: '1400px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 10
        }}>
          {/* Layer stack visualization */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0'
          }}>
            {sandboxData.layers.map((layer, index) => (
              <div
                key={layer.id}
                onClick={() => setSelectedLayer(selectedLayer === layer.id ? null : layer.id)}
                style={{
                  background: `linear-gradient(135deg, ${layer.color} 0%, ${layer.color}dd 100%)`,
                  border: `2px solid ${selectedLayer === layer.id ? '#3282b8' : layer.color}`,
                  borderRadius: index === 0 ? '20px 20px 0 0' : index === sandboxData.layers.length - 1 ? '0 0 20px 20px' : '0',
                  padding: '25px 30px',
                  cursor: 'pointer',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  transform: selectedLayer === layer.id ? 'scale(1.02) translateX(10px)' : 'scale(1)',
                  animation: isAnimating ? `slideIn 0.6s ease-out ${index * 0.15}s both` : 'none',
                  boxShadow: pulseIndex === index ? '0 0 30px rgba(50, 130, 184, 0.4)' : '0 4px 20px rgba(0,0,0,0.3)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                {/* Security scan effect for protected layers */}
                {layer.protected && (
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(90deg, transparent 0%, rgba(34, 197, 94, 0.1) 50%, transparent 100%)',
                    backgroundSize: '200% 100%',
                    animation: 'securityScan 3s linear infinite',
                    pointerEvents: 'none'
                  }} />
                )}
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px', position: 'relative' }}>
                  <span style={{ 
                    fontSize: '2.5rem',
                    animation: selectedLayer === layer.id ? 'float 2s ease-in-out infinite' : 'none'
                  }}>
                    {layer.icon}
                  </span>
                  <div style={{ flex: 1 }}>
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '12px',
                      marginBottom: '5px',
                      flexWrap: 'wrap'
                    }}>
                      <h3 style={{ 
                        margin: 0, 
                        fontSize: 'clamp(1rem, 2vw, 1.3rem)',
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontWeight: 600,
                        color: '#fff'
                      }}>
                        {layer.name}
                      </h3>
                      {layer.protected && (
                        <span style={{
                          background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                          padding: '3px 10px',
                          borderRadius: '20px',
                          fontSize: '0.7rem',
                          fontWeight: 600,
                          color: '#fff',
                          textTransform: 'uppercase',
                          letterSpacing: '1px'
                        }}>
                          🔒 Protected
                        </span>
                      )}
                    </div>
                    <p style={{ 
                      margin: 0, 
                      color: '#9ca3af',
                      fontSize: '0.9rem'
                    }}>
                      {layer.description}
                    </p>
                  </div>
                  <div style={{
                    padding: '8px 15px',
                    background: 'rgba(0,0,0,0.3)',
                    borderRadius: '10px',
                    fontSize: '0.8rem',
                    color: '#6b7280',
                    whiteSpace: 'nowrap'
                  }}>
                    {layer.size}
                  </div>
                </div>

                {/* Expanded details */}
                {selectedLayer === layer.id && (
                  <div style={{
                    marginTop: '20px',
                    paddingTop: '20px',
                    borderTop: '1px solid rgba(255,255,255,0.1)',
                    animation: 'slideIn 0.3s ease-out'
                  }}>
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                      gap: '10px'
                    }}>
                      {layer.details.map((detail, i) => (
                        <div key={i} style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          padding: '10px 15px',
                          background: 'rgba(0,0,0,0.2)',
                          borderRadius: '8px',
                          fontSize: '0.85rem'
                        }}>
                          <span style={{ 
                            color: detail.includes('CANNOT') ? '#ef4444' : '#22c55e',
                            fontSize: '1rem'
                          }}>
                            {detail.includes('CANNOT') ? '✗' : '✓'}
                          </span>
                          {detail}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Info Panel */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px'
          }}>
            {/* Access Control Panel */}
            <div style={{
              background: 'rgba(15, 52, 96, 0.5)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(50, 130, 184, 0.3)',
              borderRadius: '20px',
              padding: '25px',
              animation: 'slideIn 0.6s ease-out 0.5s both'
            }}>
              <h3 style={{
                margin: '0 0 20px 0',
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '1.2rem',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}>
                <span style={{ fontSize: '1.5rem' }}>🔐</span>
                Access Control
              </h3>

              {/* Toggle */}
              <div style={{
                display: 'flex',
                gap: '10px',
                marginBottom: '20px'
              }}>
                <button
                  onClick={() => setShowBlocked(false)}
                  style={{
                    flex: 1,
                    padding: '12px',
                    background: !showBlocked ? 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)' : 'rgba(0,0,0,0.3)',
                    border: 'none',
                    borderRadius: '10px',
                    color: '#fff',
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                >
                  ✓ Allowed
                </button>
                <button
                  onClick={() => setShowBlocked(true)}
                  style={{
                    flex: 1,
                    padding: '12px',
                    background: showBlocked ? 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)' : 'rgba(0,0,0,0.3)',
                    border: 'none',
                    borderRadius: '10px',
                    color: '#fff',
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                >
                  ✗ Blocked
                </button>
              </div>

              {/* Access list */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {(showBlocked ? sandboxData.blocked : sandboxData.allowed).map((item, i) => (
                  <div key={i} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px 15px',
                    background: 'rgba(0,0,0,0.3)',
                    borderRadius: '10px',
                    borderLeft: `3px solid ${showBlocked ? '#ef4444' : '#22c55e'}`,
                    animation: `slideIn 0.3s ease-out ${i * 0.1}s both`
                  }}>
                    <span style={{ 
                      fontSize: '1.2rem',
                      color: showBlocked ? '#ef4444' : '#22c55e'
                    }}>
                      {showBlocked ? '🚫' : '✅'}
                    </span>
                    <div>
                      <div style={{ 
                        fontSize: '0.85rem',
                        color: '#fff'
                      }}>
                        {item.path}
                      </div>
                      <div style={{ 
                        fontSize: '0.75rem',
                        color: '#6b7280'
                      }}>
                        {item.reason}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sandbox Info Card */}
            <div style={{
              background: 'rgba(15, 52, 96, 0.5)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(50, 130, 184, 0.3)',
              borderRadius: '20px',
              padding: '25px',
              animation: 'slideIn 0.6s ease-out 0.7s both'
            }}>
              <h3 style={{
                margin: '0 0 20px 0',
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '1.2rem',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}>
                <span style={{ fontSize: '1.5rem' }}>📊</span>
                Sandbox Details
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[
                  { label: 'Status', value: sandboxData.status, color: '#22c55e' },
                  { label: 'Template', value: 'claude-code', color: '#3282b8' },
                  { label: 'Base Image', value: sandboxData.base, color: '#f59e0b' },
                  { label: 'Workspace', value: '...sandbox-testing', color: '#8b5cf6' }
                ].map((item, i) => (
                  <div key={i} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '10px 15px',
                    background: 'rgba(0,0,0,0.2)',
                    borderRadius: '8px'
                  }}>
                    <span style={{ color: '#6b7280', fontSize: '0.85rem' }}>{item.label}</span>
                    <span style={{ 
                      color: item.color,
                      fontSize: '0.85rem',
                      fontWeight: 600
                    }}>
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Command Preview */}
            <div style={{
              background: '#0d1117',
              border: '1px solid #30363d',
              borderRadius: '15px',
              padding: '20px',
              animation: 'slideIn 0.6s ease-out 0.9s both'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '15px'
              }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f57' }} />
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#febc2e' }} />
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#28c840' }} />
                <span style={{ marginLeft: '10px', color: '#6b7280', fontSize: '0.8rem' }}>Terminal</span>
              </div>
              <div style={{ fontSize: '0.9rem' }}>
                <span style={{ color: '#7ee787' }}>$</span>
                <span style={{ color: '#79c0ff' }}> docker</span>
                <span style={{ color: '#ff7b72' }}> sandbox</span>
                <span style={{ color: '#ffa657' }}> run</span>
                <span style={{ color: '#a5d6ff' }}> claude</span>
                <span style={{
                  display: 'inline-block',
                  width: '8px',
                  height: '18px',
                  background: '#58a6ff',
                  marginLeft: '5px',
                  animation: 'blink 1s infinite',
                  verticalAlign: 'middle'
                }} />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{
          textAlign: 'center',
          marginTop: '40px',
          color: '#4b5563',
          fontSize: '0.85rem',
          position: 'relative',
          zIndex: 10
        }}>
          Click on any layer to explore • Built for presentation by Ajeet Singh Raina
        </div>
      </div>
    </>
  );
}
