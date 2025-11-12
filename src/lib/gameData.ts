import * as THREE from "three";

// This will display like a floating GIF in the game world
export const GIF_MESSAGES = [
	{
		id: "gif1",
		message: `
      <p>You cannot simply leave, James. Because James cannot be offboarded. The system will not compile without him. The stand-ups go silent. The CI pipeline whispers his name. Without him Jira tickets start to burn. The commit history rearranges, forming JH initials. React leaks from the monitors. James leaves, but the code remembers. The force of his absence consumes the sprint. T̶h͝e͠ ͡l͢o͠g͘s͢ ͜wr̢it͝e̢ ͠t͠h͞e͟m̷s̸e͝l͝v͟e̴s͞. C̡o͞n̶s͞o͝l͝e͝ ͠o͝u͠t͝p̴u͞t͝ ̸d͞r͝i͜p͠s͞ ͞l͞i̷k͠e͠ ͞m̸e͠m̷o͟r̡y͝ ͞l̷e͝a͟k͟s̸.͜ H̴e͜ ͝c̴o̶m͞m͞i̷t͏s̡ ͠f̴r͡o͝m̷ ̵b͞e̷y͜o͝n͏d̵.͜  Pipelines multiply. Branches fold in on themselves. T̛͘h̸̴e͢͡ ̕͠͞r̢͠e̶͘p͜o̴̡ ͠͝w͢͢h͢͠i̶͠s̷͘p͘͟e̢̕r̴͟s͡ ̷͡i̴͜n͢ ̶͞c͝͝o͏d̴͞e̴ ͢͡o̴͢f̶̡ ̷͜t͟h͜͞e̶͡ ͏͠d̕͠e͏̴a͜͜d̴͘.̸͜  H̶e͞͝ ͘͢m̢͡e̸͝r̛͢g̷͘ę̶s̷͢.͡͠ J̴͜a̶͠m͝͏e̴̕s̸͞ ͟͜l̵͠i̶͞v̴̛e̴͢s͝.̵̨  ᵒ͞h͜ ̸g͢o͡d͠ ͘n̢o͠ N̢O͡ N̴Θ͜ A̵̸̠̳̬͈͍͈͇̠̟̩̺̗͎͓̬͚̝͘ͅÀ̷̴̮̫͍̘̯͍͍̳͓̩̥̠̼͓͙̫̘ą̷̩̱͇̼͈̞̩̯̳̥͓͖͔̪̯͘͝h̴͔̞͕̦̬̤̦̻͍͓͚͔̫͜͟h̸̴̡͚͉̞̪̯̪͉̩͓̦͍̦͞h̸̴̷̨̺͇̞̟͓̹̘͓͇̪̞͙̯̤̝͍ͅh̨͘͏̖̠̼̞̠̰̘͎̞̜͙̗̩̤͕̪ͅ</p>
	  <p>&nbsp;</p>
	  <p>&nbsp;</p>
	  <p>&nbsp;</p>
	  <p>-yan</p>
    `,
		position: new THREE.Vector3(0, 3, -12),
		imageUrl:
			"https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExbW9mNHlkZTllaTFqc3J2ZXE5OWd1YmV4YmEybHZ3Y281bGxzNzN6cCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3ohzdMk3uz9WSpdTvW/giphy.gif",
	},
];

// This will display like a floating box in the game world
export const GAME_MESSAGES = [
	{
		id: "radu",
		message: `
      <h2 style="color: #ff6600; margin-bottom: 16px;">You can't just shoot a hole into the surface of Mars!</h2>
      <p style="margin-bottom: 12px;">But you sure left a mark in our small community here James.</p>
      <p style="margin-bottom: 12px;">I will miss chatting with your every week and your hidden talents. You are an amazing person to have around and a great techie.</p>
      <p style="margin-bottom: 12px;">Against all the evil that Hell can conjure with react frameworks, all the wickedness that mankind can produce with NaN !== from NaN, we will send unto them... only you. Rip and tear, until it is done.</p>
      <p style="margin-bottom: 12px;">And that is the legacy you leave behind. Lots of amazing work and yet some more.</p>
	  <p style="margin-bottom: 12px;">They are rage, brutal, without mercy. But you, you will be worse. RIP AND TEAR UNTIL IT IS DONE!</p>
	  <p>🖖 Radu.</p>
    `,
		position: new THREE.Vector3(-8, 3, -5),
	},
	{
		id: "andy",
		message: `
  		<img style="float:left; margin-right: 12px;" src="https://media.licdn.com/dms/image/v2/C4D03AQF3DBHZ8WhgCw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1601802361464?e=1764806400&v=beta&t=48oA5jYHFPXBkdirIwg3rX33txC6B69GoyLJF_8FgzE" width="60" height="60" />
      <h3 style="color: #ff6600; margin-bottom: 16px;">Bye James!</h3>
      <p style="margin-bottom: 12px;">Sorry to see you go.  Quite enjoyed the one-to-one calls!</p>
      <p style="margin-bottom: 12px;">I hope everything works out for you, you enjoy the new gaff, and whatever new role you find yourself in.</p>
      <p style="margin-bottom: 12px;">Take care. Andy</p>
    `,
		position: new THREE.Vector3(-2, 3, 7),
	},
	{
		id: "controls",
		message: `
      <h3 style="color: #ff4400; margin-bottom: 16px;">Game Controls</h3>
      <ul style="margin: 0; padding-left: 20px;">
        <li style="margin-bottom: 8px;"><strong>W/↑:</strong> Move Forward</li>
        <li style="margin-bottom: 8px;"><strong>S/↓:</strong> Move Backward</li>
        <li style="margin-bottom: 8px;"><strong>A/←:</strong> Move Left</li>
        <li style="margin-bottom: 8px;"><strong>D/→:</strong> Move Right</li>
        <li style="margin-bottom: 8px;"><strong>Left Click:</strong> Shoot</li>
        <li style="margin-bottom: 8px;"><strong>Left Click:</strong> Close Dialog</li>
      </ul>
    `,
		position: new THREE.Vector3(8, 4, -3),
	},
	{
		id: "story",
		message: `
      <h3 style="color: #cc4400; margin-bottom: 16px;">Mission Briefing</h3>
      <p style="margin-bottom: 12px;">You are trapped in this mysterious room.</p>
      <p style="margin-bottom: 12px;">Strange creatures are approaching from all sides.</p>
      <p style="margin-bottom: 12px;">Your only weapon is this trusty minigun.</p>
      <p style="margin-bottom: 12px;">Defend yourself and uncover the secrets hidden in these message boxes.</p>
      <p style="color: #ff6600;"><em>Good luck, soldier!</em></p>
    `,
		position: new THREE.Vector3(0, 5, -8),
	},
	{
		id: "tips",
		message: `
      <h3 style="color: #aa3300; margin-bottom: 16px;">Combat Tips</h3>
      <p style="margin-bottom: 12px;">🎯 Aim carefully - bullets travel fast but have limited range</p>
      <p style="margin-bottom: 12px;">⚡ Enemies move slowly, use this to your advantage</p>
      <p style="margin-bottom: 12px;">💥 Each enemy kill gives you 100 points</p>
      <p style="margin-bottom: 12px;">📦 Reading messages gives you 50 points</p>
      <p style="color: #ff8844;">Remember: Keep moving to avoid being cornered!</p>
    `,
		position: new THREE.Vector3(-5, 2, 8),
	},
	{
		id: "secrets",
		message: `
      <h3 style="color: #ff6600; margin-bottom: 16px;">Hidden Secrets</h3>
      <p style="margin-bottom: 12px;">This room holds ancient mysteries...</p>
      <p style="margin-bottom: 12px;">The creatures you fight were once like you.</p>
      <p style="margin-bottom: 12px;">Each message box contains a fragment of the truth.</p>
      <p style="margin-bottom: 12px;">Collect them all to understand your fate.</p>
      <p style="margin-bottom: 12px;">But beware - knowledge comes at a price.</p>
      <div style="border-top: 1px solid #ff4400; padding-top: 12px; margin-top: 16px;">
        <p style="font-style: italic; color: #cc6600;">
          "In this room, time moves differently..."<br/>
          "The walls remember everything..."<br/>
          "Your gun is not your only weapon..."
        </p>
      </div>
    `,
		position: new THREE.Vector3(6, 3, 6),
	},
];

// Predefined enemy spawn positions
export const ENEMY_SPAWN_POSITIONS = [
	new THREE.Vector3(-10, 0, -10),
	new THREE.Vector3(10, 0, -10),
	new THREE.Vector3(-10, 0, 10),
	new THREE.Vector3(10, 0, 10),
	new THREE.Vector3(0, 0, -12),
	new THREE.Vector3(-12, 0, 0),
	new THREE.Vector3(12, 0, 0),
	new THREE.Vector3(0, 0, 12),
];

// Game configuration
export const GAME_CONFIG = {
	BULLET_SPEED: 1.5,
	BULLET_LIFETIME: 5000, // milliseconds
	ENEMY_SPEED: 0.02,
	ENEMY_HEALTH: 100,
	ENEMY_DAMAGE: 10,
	ENEMY_ATTACK_RANGE: 2.5,
	ENEMY_ATTACK_COOLDOWN: 1000, // milliseconds
	PLAYER_SPEED: 0.1,
	ROOM_SIZE: 15,
	MAX_ENEMIES: 8,
	ENEMY_SPAWN_INTERVAL: 5000, // milliseconds
	HIT_DISTANCE: 1.0,
	MAX_AMMO: 200,
	RELOAD_TIME: 2000, // milliseconds
	AMMO_PER_CLIP: 50,
};
