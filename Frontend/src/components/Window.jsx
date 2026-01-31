import { X, Minus, Maximize2 } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

const Window = ({ title, icon: Icon, children, onClose, onMinimize, isActive, onFocus, defaultPosition }) => {
  const [isMaximized, setIsMaximized] = useState(false);
  const [position, setPosition] = useState(defaultPosition || { x: 50, y: 50 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const windowRef = useRef(null);

  const handleMouseDown = (e) => {
    if (e.target.closest('.window-controls')) return;
    onFocus();
    setIsDragging(true);
    const rect = windowRef.current.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDragging && !isMaximized) {
        setPosition({
          x: e.clientX - dragOffset.x,
          y: e.clientY - dragOffset.y
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset, isMaximized]);

  return (
    <div
      ref={windowRef}
      onMouseDown={() => onFocus()}
      style={{
        position: 'fixed',
        top: isMaximized ? 0 : position.y,
        left: isMaximized ? 0 : position.x,
        width: isMaximized ? '100vw' : '800px',
        height: isMaximized ? '100vh' : '600px',
        maxWidth: '100vw',
        maxHeight: '100vh',
        backgroundColor: 'rgba(22, 22, 26, 0.95)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: isMaximized ? 0 : '12px',
        boxShadow: isActive ? '0 20px 50px rgba(0,0,0,0.5)' : '0 10px 30px rgba(0,0,0,0.3)',
        zIndex: isActive ? 100 : 10,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        transition: isDragging ? 'none' : 'width 0.3s, height 0.3s, top 0.3s, left 0.3s',
        opacity: isActive ? 1 : 0.9
      }}
    >
      {/* Title Bar */}
      <div
        onMouseDown={handleMouseDown}
        style={{
          padding: '0.8rem 1rem',
          background: 'rgba(255,255,255,0.05)',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          cursor: isMaximized ? 'default' : 'move',
          userSelect: 'none'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          {Icon && <Icon size={18} color="var(--accent)" />}
          <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{title}</span>
        </div>
        
        <div className="window-controls" style={{ display: 'flex', gap: '0.5rem' }}>
           <button 
             onClick={(e) => { e.stopPropagation(); onMinimize(); }}
             style={{ padding: '4px', borderRadius: '4px', background: 'transparent', color: 'var(--text-secondary)' }}
             className="hover-bg"
           >
             <Minus size={14} />
           </button>
           <button 
             onClick={(e) => { e.stopPropagation(); setIsMaximized(!isMaximized); }}
             style={{ padding: '4px', borderRadius: '4px', background: 'transparent', color: 'var(--text-secondary)' }}
             className="hover-bg"
           >
             <Maximize2 size={14} />
           </button>
           <button 
             onClick={(e) => { e.stopPropagation(); onClose(); }}
             style={{ padding: '4px', borderRadius: '4px', background: 'var(--error)', color: 'white' }}
           >
             <X size={14} />
           </button>
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflow: 'auto', padding: '1.5rem' }}>
        {children}
      </div>
    </div>
  );
};

export default Window;
