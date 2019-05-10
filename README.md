# MMM-ApexLegends
A [MagicMirror²](https://github.com/MichMich/MagicMirror) module that shows Apex Legends players' stats (level, kills and global rank).

The stats are fetched from [the ApexTab API](https://github.com/Tabwire/ApexTab-API).

# Installation
1. Clone repo:
```
	cd MagicMirror/modules/
	git clone https://github.com/retroflex/MMM-ApexLegends
```
2. Install dependencies:
```
	cd MMM-ApexLegends/
	npm install
```
3. Add the module to the ../MagicMirror/config/config.js, example:
```
		{
			module: 'MMM-ApexLegends',
			header: 'Apex Legends',
			position: 'top_center',
			config: {
				showLevel: false,
				sortBy: 'kills',
				userIDs: [ '402282792fbf00d7845d3fcb5e5d1f1c', 'f5337d769b7b29628f59d8c84ea45d9d' ],
			}
		},
```
# Configuration
| Option                        | Description
| ------------------------------| -----------
| `showLevel`                   | Whether to show column with the user's level.<br />**Default value:** true
| `showKills`                   | Whether to show column with the user's number of kills.<br />**Default value:** true
| `showGlobalRank`              | Whether to show column with the user's global rank.<br />**Default value:** true
| `sortBy`                      | Which column to sort by. Possible values: 'level', 'kills' or 'globalRank'.<br />**Default value:** globalRank
| `fetchInterval`               | How often to fetch stats (milliseconds).<br />**Default value:** 10 * 60 * 1000 (every ten minutes)
| `userIDs`                     | Array of user ID's.<br />Use this URL to get the user ID from user name:<br />https://apextab.com/api/search.php?platform=pc&search=YOURUSERNAME<br />**Default value:** f5337d769b7b29628f59d8c84ea45d9d (BallerInGame)

# Customize Looks
The following class names can be used in 'MagicMirror/css/custom.css' to customize looks (see [MMM-ApexLegends.css](https://github.com/retroflex/MMM-ApexLegends/blob/master/MMM-ApexLegends.css) for example):

| CSS name                      | Description
| ------------------------------| -----------
| header-row                    | Header (whole row).
| stats-row                     | The players' stats (whole rows).
| username-header               | Username header.
| level-header                  | Level header.
| kills-header                  | Kills header.
| global-rank-header            | Global rank header.
| level                         | Player level.
| kills                         | Number of kills.
| globa-rank                    | Player's global rank.
