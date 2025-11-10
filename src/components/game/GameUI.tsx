import useGameState from "../../lib/stores/useGameState";

export default function GameUI() {
  const { score, enemiesKilled, messagesRead, crosshair, playerHealth, playerMaxHealth, ammoInClip, reserveAmmo, maxClipSize, isReloading, currentLevel, roomLayout } = useGameState();

  const healthPercent = (playerHealth / playerMaxHealth) * 100;
  const clipPercent = (ammoInClip / maxClipSize) * 100;

  return (
    <>
      {/* Crosshair */}
      {crosshair && (
        <div
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10"
          style={{
            width: '20px',
            height: '20px',
            border: '2px solid #ff4400',
            borderRadius: '50%',
            boxShadow: '0 0 10px #ff4400'
          }}
        >
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            style={{
              width: '4px',
              height: '4px',
              backgroundColor: '#ff4400',
              borderRadius: '50%'
            }}
          />
        </div>
      )}

      {/* Game stats */}
      <div className="fixed top-4 left-4 text-white z-10 font-mono">
        <div
          className="bg-black bg-opacity-70 p-4 rounded border border-orange-600"
          style={{ minWidth: '200px' }}
        >
          <h3 className="text-orange-400 text-lg mb-2">DOOM SHOOTER</h3>
          <div className="text-center mb-2 px-2 py-1 bg-orange-900 bg-opacity-50 rounded border border-orange-500">
            <div className="text-yellow-300 text-xs">LEVEL {currentLevel}</div>
            <div className="text-orange-300 text-xs capitalize">{roomLayout}</div>
          </div>
          <div className="space-y-2">
            {/* Health bar */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-orange-300">Health:</span>
                <span className={`font-bold ${playerHealth > 60 ? 'text-green-400' : playerHealth > 30 ? 'text-yellow-400' : 'text-red-400'}`}>
                  {playerHealth}/{playerMaxHealth}
                </span>
              </div>
              <div className="w-full h-3 bg-gray-800 border border-orange-600 rounded">
                <div
                  className={`h-full rounded transition-all duration-300 ${
                    playerHealth > 60 ? 'bg-green-500' :
                    playerHealth > 30 ? 'bg-yellow-500' :
                    'bg-red-500'
                  }`}
                  style={{ width: `${healthPercent}%` }}
                />
              </div>
            </div>

            <div className="flex justify-between">
              <span className="text-orange-300">Score:</span>
              <span className="text-yellow-400 font-bold">{score}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-orange-300">Enemies:</span>
              <span className="text-red-400 font-bold">{enemiesKilled}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-orange-300">Messages:</span>
              <span className="text-green-400 font-bold">{messagesRead}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Ammo Counter - Bottom Left */}
      <div className="fixed bottom-4 left-4 text-white z-10 font-mono">
        <div className="bg-black bg-opacity-70 p-4 rounded border border-orange-600">
          <div className="text-orange-400 text-sm mb-2">MINIGUN</div>
          {isReloading ? (
            <div className="text-yellow-400 text-2xl font-bold animate-pulse">
              RELOADING...
            </div>
          ) : (
            <div>
              <div className="text-4xl font-bold" style={{
                color: ammoInClip > 25 ? '#44ff44' : ammoInClip > 10 ? '#ffff44' : '#ff4444'
              }}>
                {ammoInClip}
              </div>
              <div className="text-orange-300 text-sm">
                / {reserveAmmo}
              </div>
            </div>
          )}
          <div className="w-32 h-2 bg-gray-800 border border-orange-600 rounded mt-2">
            <div
              className={`h-full rounded transition-all duration-200 ${
                ammoInClip > 25 ? 'bg-green-500' :
                ammoInClip > 10 ? 'bg-yellow-500' :
                'bg-red-500'
              }`}
              style={{ width: `${clipPercent}%` }}
            />
          </div>
          <div className="text-orange-300 text-xs mt-1">
            Press R to Reload
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="fixed bottom-4 right-4 text-white z-10 font-mono">
        <div className="bg-black bg-opacity-70 p-3 rounded border border-orange-600 text-sm">
          <div className="text-orange-400 mb-2">Controls:</div>
          <div className="space-y-1 text-orange-200">
            <div>WASD - Move</div>
            <div>Mouse - Look</div>
            <div>Left Click - Shoot/Close</div>
            <div>R - Reload</div>
          </div>
        </div>
      </div>

      {/* Status face */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 text-white z-10 font-mono">
        <div className="bg-black bg-opacity-80 px-4 py-3 rounded border border-orange-600 shadow-lg flex items-center gap-3">
          <div className="w-20 h-20 border-2 border-orange-500 rounded-sm overflow-hidden bg-black">
            <img
              src="/domguy/domguy-1.png"
              alt="Domguy status"
              className="w-full h-full object-cover"
              draggable={false}
            />
          </div>
          <div className="text-orange-300 text-xs leading-relaxed max-w-40">
            Stay focused, Marine. Keep your finger on the trigger and your health above zero.
          </div>
        </div>
      </div>
    </>
  );
}
