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
      <p>Take care. Andy</p>
    `,
		position: new THREE.Vector3(-2, 3, 7),
	},
	{
		id: "francesco",
		message: `
      <h3 style="color: #ff4400; margin-bottom: 16px;">Rip and tear until it is done</h3>
      <p>It's been great working with you mate - I wish you all the best for your next chapter, stay in touch!</p>
	  <p>~Francesco</p>
    `,
		position: new THREE.Vector3(8, 4, -3),
	},
	{
		id: "jon",
		message: `
      <h3 style="color: #cc4400; margin-bottom: 16px;">Mission Briefing Expedia</h3>
      <p style="margin-bottom: 12px;">James - I think the only time we crossed paths was on Expedia about 100 years ago, but so much has happened since then, I'm not sure if I can trust my own memory anymore.</p>
      <p style="margin-bottom: 12px;">Very sad to see another familiar name leaving the fold, but absolutely & truly wish you all the best with whatever comes next.</p>
	  <p>JonT.</p>
    `,
		position: new THREE.Vector3(0, 5, -8),
	},
	{
		id: "dom",
		message: `
      <h3 style="color: #aa3300; margin-bottom: 16px;">Render loop</h3>
      <p style="margin-bottom: 12px;">James! It's been years since we spoke, I'll always remember that awesome talk you gave on making a game in a browser back in First St and the detail of what's going on (Render loop etc)- it was super impressive and will stay with me.</p>
      <p style="margin-bottom: 12px;">Wishing you all the best on whatever is next, I know you'll be missed alot here - take care!!</p>
      <p style="color: #ff8844;">Dom</p>
    `,
		position: new THREE.Vector3(-5, 2, 8),
	},
	{
		id: "dom",
		message: `
      <h3 style="color: #aa3300; margin-bottom: 16px;">Sorry to see you go.</h3>
      <p style="margin-bottom: 12px;">When I eventually take over the world there will be a special place for you in Hodgetopia along with a reasonable size golden statue of you doing the doom meme rubbing your face with our enemies blood.</p>
      <p style="color: #ff8844;">John Hodges</p>
    `,
		position: new THREE.Vector3(-5, 2, 8),
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
