// New upload
/**************************************************************************

Big thanks to Arun who created Chucker
                        
						Simony


ChuckACrap V3.0 released 21, February 2010

Features : 

Added Queue System
Added Send Collections feature 

Changes :
// 11/04/2010 Changed the way receiver id is got, special characters should appear correctly now
// 14/04/2010 Added a Send All button and function
// 14/04/2010 Added code to remove delimiter : from a user's MW name
// 17/04/2010 v3.1 Individual queue items can be removed removeItem() function
// 19/04/2010 Added code to remove the hidden FB container which caused trouble in Chrome
// 22/04/2010 All temp variables in add to queue function
// 23/04/2010 City collection sets, Boost sets, and chop shop sets added Version changed to 3.2
_________________

ChuckACrap V2.0 released 19, January 2010

Features : 
>Quantity fetching not done for each item separately and changed to POST instead of GET
>Improved UI
>Forced 2 second delay
>Alphabetical Sorting of Loot and boosts and categorizing of Collection items by city and collection type
>Hangup recovery code added for quantity fetching and gifting

_________________

ChuckACrap V1.0b released 23, December 2009

Features : 
>Choosing receiver from either profile page or list box
>Fixed refreshing of page by pressing the close button

_________________

ChuckACrap V1.0 released 18, December 2009
Author : Arun Nava

Parts of this code are gotten from Spockholm's RepeatGift tool specifically 
the part where we check for http response states in the state_change method.

His script can be found at www.spockholm.com/mafia/bookmarklets.php

Got the idea for Unframing from the UnframeMW bookmarlet written by Vern

But my code is different so it may not work the same.
*************************************************************************/

// + '<option value="677">Golden Treasure Chest' 

function createCookie(a, b) {
	var c = new Date();
	c.setDate(c.getDate() + 30);
	document.cookie = a + "=" + b + ";expires=" + c.toGMTString() + "; path=/"
}
function readCookie(a) {
	var i, cookie, nameEQ = a + "=",
	cookieArray = document.cookie.split(";");
	for (i = 0; i < cookieArray.length; i++) {
		cookie = cookieArray[i];
		while (cookie.charAt(0) == ' ') cookie = cookie.substring(1, cookie.length);
		if (cookie.indexOf(nameEQ) == 0) return cookie.substring(nameEQ.length, cookie.length)
	}
}
function field_validate(eventKeyCode) {
	if ((eventKeyCode >= 48 && eventKeyCode <= 57) || (eventKeyCode >= 96 && eventKeyCode <= 105) || eventKeyCode == 8 || eventKeyCode == 127 || eventKeyCode == 37 || eventKeyCode == 39 || eventKeyCode == 9 || eventKeyCode == 46) {
		return true
	} else {
		return false
	}
}
function alert_user(errorMessage) {
	var alertHours = new Date().getHours();
	var alertMinutes = new Date().getMinutes();
	alertHours = (alertHours < 10 ? '0' + alertHours: alertHours);
	alertMinutes = (alertMinutes < 10 ? '0' + alertMinutes: alertMinutes);
	try {
		document.getElementById('errormsg').innerHTML += '<tr style="padding-left:5px"><td>[' + alertHours + ':' + alertMinutes + '] ' + errorMessage + '</td></tr>'
	} catch(err) {}
}

javascript: (function () {
	var version = "PS Chucker v5.27 (Simony)";
	var updates = '<li>Add: Ahoy boosts</li>';
	if (top === self) {
		try {
			if (navigator.appName == 'Microsoft Internet Explorer') {
				alert('Chucker is not designed to work in Internet Explorer. Please switch to Firefox or Chrome.');
				return
			}
			if (/m.mafiawars.com/.test(document.location)) {
				window.location.href = document.location + '?iframe=1'
			} else if (/apps.facebook.com.inthemafia/.test(document.location)) {
				for (var i = 0; i < document.forms.length; i++) {
					if (/^canvas_iframe_post/.test(document.forms[i].id)) {
						document.forms[i].target = '';
						document.forms[i].submit();
						return
					}
				}
			} else if (document.getElementById('some_mwiframe')) {
				window.location.href = document.getElementById('some_mwiframe').src;
				return
			} else {
				document.body.parentNode.style.overflowY = "scroll";
				document.body.style.overflowX = "auto";
				document.body.style.overflowY = "auto";
				try {
					document.evaluate('//div[@id="mw_city_wrapper"]/div', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).style.margin = "auto";
					if (typeof FB != 'undefined') {
						FB.CanvasClient.stopTimerToSizeToContent;
						window.clearInterval(FB.CanvasClient._timer);
						FB.CanvasClient._timer = -1
					}
				} catch(fberr) {}
			}
			function fix_block() {
				setTimeout(function () {
					$('#popup_fodder').find('div').each(function () {
						if ($(this).attr('id').length > 0 && !$(this).attr('opened')) {
							$(this).css('display', 'block');
							$(this).attr('opened', 'yes')
						}
					})
				},
				500)
			}
			document.getElementById('popup_fodder').addEventListener('DOMSubtreeModified', fix_block, false)
		} catch(err) {}
		try {
			$('#mw_like_button').remove();
			$('iframe[name="mafiawars_zbar"]').parent().remove()
		} catch(err) {}
	}
	try {
		document.getElementById('header_top_promo_banner').parentNode.removeChild(document.getElementById('header_top_promo_banner'))
	} catch(fberr) {}
	try {
		document.getElementById('LoadingOverlay').parentNode.removeChild(document.getElementById('LoadingOverlay'));
		document.getElementById('LoadingBackground').parentNode.removeChild(document.getElementById('LoadingBackground'))
	} catch(fberr) {}
	try {
		document.getElementById('snapi_zbar').parentNode.parentNode.removeChild(document.getElementById('snapi_zbar').parentNode)
	} catch(fberr) {}
	var g = /sf_xw_user_id': 'p\|(.+)'/.exec(document.body.innerHTML)[1];
	if (g == '47810573') {
		alert('Scam me will ya you stupid SOB.. I\'ll make sure everyone who uses the Chucker knows about you and is warned about you, you dumb prick.\n\n\n BANNED !');
		return
	}
	if (g == '47869484' ||g == '78199035') {
		return
	}
	function current_city() {
		if ($('#mw_city_wrapper').hasClass('mw_city1')) {
			return 1
		} else if ($('#mw_city_wrapper').hasClass('mw_city2')) {
			return 2
		} else if ($('#mw_city_wrapper').hasClass('mw_city3')) {
			return 3
		} else if ($('#mw_city_wrapper').hasClass('mw_city4')) {
			return 4
		} else if ($('#mw_city_wrapper').hasClass('mw_city5')) {
			return 5
		} else if ($('#mw_city_wrapper').hasClass('mw_city6')) {
			return 6
		} else if ($('#mw_city_wrapper').hasClass('mw_city7')) {
			return 7
		} else if ($('#mw_city_wrapper').hasClass('mw_city8')) {
			return 8
		} else if ($('#mw_city_wrapper').hasClass('mw_city9')) {
			return 9
		}
	}
	var h = current_city();
	try {
		document.getElementById("popup_permanence").removeChild(document.getElementById("gifter_div"))
	} catch(err) {}
	var k = document.getElementById('popup_permanence');
	var l = document.createElement("div");
	l.id = 'gifter_div';
	
	var http = 'http://';
	if (/https/.test(document.location)) {
	  http = 'https://';
	}
	
	var error_window = '<table class="sexy_error_table" width=100% id="errormsg" border=2 rules=none bgcolor="black"></table><br>';
	
	var cuban_collection = '<option value="QueueSet_40" style="color:rgb(255, 217, 39);"><< CUBAN COLLECTIONS >>' 
		+ '<option value="QueueSet_7" style="color:#33FF00;"><< RUM DRINKS COLLECTION >>' 
			+ '<option value="2001">Pina Colada' 
			+ '<option value="2002">Hurricane' 
			+ '<option value="2003">Bahama Mama' 
			+ '<option value="2004">Mojito' 
			+ '<option value="2005">Rum Runner' 
			+ '<option value="2006">Long island Ice Tea' 
			+ '<option value="2007">Cuba Libre' 
		+ '<option value="QueueSet_7" style="color:#33FF00;"><< TROPICAL FRUITS COLLECTION >>' 
			+ '<option value="2008">Banana' 
			+ '<option value="2009">Lime' 
			+ '<option value="2010">Pineapple' 
			+ '<option value="2011">Papaya' 
			+ '<option value="2012">Coconut' 
			+ '<option value="2013">Passion Fruit' 
			+ '<option value="2014">Dragon Fruit' 
		+ '<option value="QueueSet_7" style="color:#33FF00;"><< ENTERTAINERS COLLECTION >>' 
			+ '<option value="2015">Magician' 
			+ '<option value="2016">Fan Dancer' 
			+ '<option value="2017">Comedian' 
			+ '<option value="2018">Band Leader' 
			+ '<option value="2019">Cabaret Singer' 
			+ '<option value="2020">Crooner' 
			+ '<option value="2021">Burlesque Dancer' 
		+ '<option value="QueueSet_7" style="color:#33FF00;"><< TROPICAL FISH COLLECTION >>' 
			+ '<option value="2022">Pufferfish' 
			+ '<option value="2023">Sergeant Major' 
			+ '<option value="2024">Yellowtail Snapper' 
			+ '<option value="2025">Great Barracuda' 
			+ '<option value="2026">Queen Angelfish' 
			+ '<option value="2027">Reef Shark' 
			+ '<option value="2028">Blue Marlin' 
		+ '<option value="QueueSet_7" style="color:#33FF00;"><< BEARDS COLLECTION >>' 
			+ '<option value="2029">Garibaldi' 
			+ '<option value="2030">Hulihee' 
			+ '<option value="2031">Vandyke' 
			+ '<option value="2032">Mutton Chops' 
			+ '<option value="2033">Soul Patch' 
			+ '<option value="2034">French Fork' 
			+ '<option value="2035">Fidel';

	var mission_collection = '<option value="QueueSet_7" style="color:red;"><< MISSIONS COLLECTION >>' 
		+ '<option value="800001">Blasting Caps' 
		+ '<option value="800002">Code Breaker' 
		+ '<option value="800003">Earbud Shades' 
		+ '<option value="800004">Fake Identity' 
		+ '<option value="800005">Mook Jong' 
		+ '<option value="800006">Sniper Scope' 
		+ '<option value="800007">Stick Shift Grip';
		
	var special_collection = '<option value="QueueSet_104" style="color:rgb(255, 217, 39);"><< SPECIAL COLLECTIONS >>' 
		+ '<option value="QueueSet_7" style="color:red;"><< Trap Collection >>' 
			+ '<option value="400022">Box on a Stick' 
			+ '<option value="400023">Lobster Trap' 
			+ '<option value="400024">Mouse Trap' 
			+ '<option value="400025">Snake Pit' 
			+ '<option value="400026">Spring Snare' 
			+ '<option value="400027">Steel-jaw Trap' 
			+ '<option value="400028">Drop Net' 
		+ '<option value="QueueSet_7" style="color:red;"><< THE SUPER HERO COLLECTION >>' 
			+ '<option value="400015">Arachnid Man' 
			+ '<option value="400016">Squirrel Man' 
			+ '<option value="400017">Superbman' 
			+ '<option value="400018">Freak Squad' 
			+ '<option value="400019">Blue Beacon' 
			+ '<option value="400020">General U.S.A' 
			+ '<option value="400021">Terrific Titan' 
		+ '<option value="QueueSet_7" style="color:red;"><< RAT PACK COLLECTION >>' 
			+ '<option value="300022">Sammy\'s Shades' 
			+ '<option value="300023">Ol\' Blue Eyes' 
			+ '<option value="300024">King of Cool' 
			+ '<option value="300025">Joote\'s Shoes' 
			+ '<option value="300026">Bogey' 
			+ '<option value="300027">Blonde Bombshell\'s Dress' 
			+ '<option value="300028">Angel\'s Coat' 
		+ '<option value="QueueSet_7" style="color:red;"><< ITALIAN PASTA COLLECTION >>' 
			+ '<option value="100036">Conchiglie' 
			+ '<option value="100037">Farfalle' 
			+ '<option value="100038">Lasagna' 
			+ '<option value="100039">Manicotti' 
			+ '<option value="100040">Rotini' 
			+ '<option value="100041">Spaghetti' 
			+ '<option value="100042">Ziti' 
		+ '<option value="QueueSet_7" style="color:red;"><< MYSTERY BAG COLLECTION >>' 
			+ '<option value="400008">Magnifying Glass' 
			+ '<option value="400009">Shoe Prints' 
			+ '<option value="400010">Calabash Pipe' 
			+ '<option value="400011">DeerStalker Hat' 
			+ '<option value="400012">Hand Cuffs' 
			+ '<option value="400013">Case Files' 
			+ '<option value="400014">Mysterious Note' 
		+ '<option value="QueueSet_7" style="color:red;"><< SLOT COLLECTION >>' 
			+ '<option value="100029">Liberty Bell' 
			+ '<option value="100030">Lucky 7' 
			+ '<option value="100031">Plum' 
			+ '<option value="100032">Lime' 
			+ '<option value="100033">Triple Bar' 
			+ '<option value="100034">Cherry' 
			+ '<option value="100035">Orange' 
		+ '<option value="QueueSet_7" style="color:red;"><< GLOBAL CUP COLLECTION >>' 
			+ '<option value="100022">English Ball' 
			+ '<option value="100023">French Ball' 
			+ '<option value="100024">Brazilian Ball' 
			+ '<option value="100025">German Ball' 
			+ '<option value="100026">Italian Ball' 
			+ '<option value="100027">Argentinean Ball' 
			+ '<option value="100028">Spanish Ball' 
		+ '<option value="QueueSet_7" style="color:red;"><< EASTER CRIME BASKET >>' 
			+ '<option value="100015">Striped Egg' 
			+ '<option value="100016">Polka Dot Egg' 
			+ '<option value="100017">Checkered Egg' 
			+ '<option value="100018">Plaid Egg' 
			+ '<option value="100019">Paisley Egg' 
			+ '<option value="100020">Last Year\'s Egg' 
			+ '<option value="100021">Golden Egg' 
		+ '<option value="QueueSet_7" style="color:red;"><< TOOLS OF THE TRADE COLLECTION >>' 
			+ '<option value="500001">Lock Picks' 
			+ '<option value="500002">Diamond Drill' 
			+ '<option value="500003">Flashlight' 
			+ '<option value="500004">Walkie Talkie' 
			+ '<option value="500005">Safecracker\'s Stethoscope' 
			+ '<option value="500006">Black Ski Masks' 
			+ '<option value="500007">Grappling Hooks' 
		+ '<option value="QueueSet_7" style="color:red;"><< STOLEN DIAMOND COLLECTION >>' 
			+ '<option value="500008">Hope Diamond' 
			+ '<option value="500009">Koh-I-Noor Diamond' 
			+ '<option value="500010">Great Star of Africa Diamond' 
			+ '<option value="500011">The Orloff Diamond' 
			+ '<option value="500012">The Sancy Diamond' 
			+ '<option value="500013">The Idol\'s Eye Diamond' 
			+ '<option value="500014">The Regent Diamond' 
		+ '<option value="QueueSet_7" style="color:red;"><< ST. PATRICK\'S DAY COLLECTION >>' 
			+ '<option value="100008">Irish Flag' 
			+ '<option value="100009">Leprechaun' 
			+ '<option value="100010">Green Fireworks' 
			+ '<option value="100011">Green Bowler\'s Cap' 
			+ '<option value="100012">Lucky Pint Glass' 
			+ '<option value="100013">Pot of Gold' 
			+ '<option value="100014">Uilleann Pipes' 
		+ '<option value="QueueSet_7" style="color:red;"><< PROTOTYPE CAR-JACKING >>' 
			+ '<option value="300001">GPS Signal Scrambler' 
			+ '<option value="300002">Tank of Gasoline' 
			+ '<option value="300003">Ignition Device' 
			+ '<option value="300004">Microchip Fitted Key' 
			+ '<option value="300005">Map of the Garage' 
			+ '<option value="300006">Counterfeit ID Badges' 
			+ '<option value="300007">Security Hacker' 
		+ '<option value="QueueSet_7" style="color:red;"><< THEFT OF A DRONE >>' 
			+ '<option value="300008">Classified Report' 
			+ '<option value="300009">Hijacked Transmitter' 
			+ '<option value="300010">Access Code' 
			+ '<option value="300011">Guards Schedule' 
			+ '<option value="300012">Calibration Manual' 
			+ '<option value="300013">Guidance Module' 
			+ '<option value="300014">UltraLite Fuel Cell' 
		+ '<option value="QueueSet_7" style="color:red;"><< WEAPONS SHIPMENT HIJACKING >>' 
			+ '<option value="300015">Shipment Info' 
			+ '<option value="300016">Schedule of Truck Route' 
			+ '<option value="300017">Road Block' 
			+ '<option value="300018">Container Key' 
			+ '<option value="300019">Rocket Ammo' 
			+ '<option value="300020">Tracking Laser Sight' 
			+ '<option value="300021">Carrying Case' 
		+ '<option value="QueueSet_7" style="color:red;"><< CHINESE NEW YEAR\'S COLLECTION >>' 
			+ '<option value="400001">Baoding Balls' 
			+ '<option value="400002">Cricket Cage' 
			+ '<option value="400003">Dragon Mask' 
			+ '<option value="400004">Four Toed Dragon' 
			+ '<option value="400005">Money Envelope' 
			+ '<option value="400006">Year of the Tiger' 
			+ '<option value="400007">Money Frog' 
		+ '<option value="QueueSet_7" style="color:red;"><< VALENTINE\'S DAY COLLECTION >>' 
			+ '<option value="100001">Heart Tattoo' 
			+ '<option value="100002">Shoot the Moon' 
			+ '<option value="100003">Stolen Heart' 
			+ '<option value="100004">Heart Locket' 
			+ '<option value="100005">Box of Chocolates' 
			+ '<option value="100006">Love Bear' 
			+ '<option value="100007">Valentine'
		+ '<option value="QueueSet_7" style="color:red;"><< THE DISCO COLLECTION >>' 
			+ '<option value="400029">Don\'t Stop Disco Ball' 
			+ '<option value="400030">Fevered Dancer' 
			+ '<option value="400031">Grooving DJ' 
			+ '<option value="400032">Surviving Wig' 
			+ '<option value="400033">Dance and Jive' 
			+ '<option value="400034">Burnin\' Bellbottoms' 
			+ '<option value="400035">Chic Sequin Jacket';
	
	var ny_collection = '<option value="QueueSet_136" style="color:rgb(255, 217, 39);"><< NEW YORK COLLECTION >>' 
		+ '<option value="QueueSet_7" style="color:#33FF00;"><< DIAMOND FLUSH COLLECTION >>' 
			+ '<option value="1036">Eight of Diamonds' 
			+ '<option value="1037">Nine of Diamonds' 
			+ '<option value="1038">Ten of Diamonds' 
			+ '<option value="1039">Jack of Diamonds' 
			+ '<option value="1040">Queen of Diamonds' 
			+ '<option value="1041">King of Diamonds' 
			+ '<option value="1042">Ace of Diamonds' 
		+ '<option value="QueueSet_7" style="color:#33FF00;""><< HEART FLUSH COLLECTION >>' 
			+ '<option value="1043">Eight of Hearts' 
			+ '<option value="1044">Nine of Hearts' 
			+ '<option value="1045">Ten of Hearts' 
			+ '<option value="1046">Jack of Hearts' 
			+ '<option value="1047">Queen of Hearts' 
			+ '<option value="1048">King of Hearts' 
			+ '<option value="1049">Ace of Hearts' 
		+ '<option value="QueueSet_7" style="color:#33FF00;"><< SCULPTURES COLLECTION >>' 
			+ '<option value="1022">Rat Sculpture' 
			+ '<option value="1023">Sheep Sculpture' 
			+ '<option value="1024">Rooster Sculpture' 
			+ '<option value="1025">Monkey Sculpture' 
			+ '<option value="1026">Tiger Sculpture' 
			+ '<option value="1027">Snake Sculpture' 
			+ '<option value="1028">Dragon Sculpture' 
		+ '<option value="QueueSet_7" style="color:#33FF00;"><< POKER CHIPS COLLECTION >>' 
			+ '<option value="1029">White Poker Chip' 
			+ '<option value="1030">Brown Poker Chip' 
			+ '<option value="1031">Red Poker Chip' 
			+ '<option value="1032">Blue Poker Chip' 
			+ '<option value="1033">Green Poker Chip' 
			+ '<option value="1034">Purple Poker Chip' 
			+ '<option value="1035">Gold Poker Chip' 
		+ '<option value="QueueSet_7" style="color:#33FF00;"><< CLUB FLUSH COLLECTION >>' 
			+ '<option value="1050">Eight of Clubs' 
			+ '<option value="1051">Nine of Clubs' 
			+ '<option value="1052">Ten of Clubs' 
			+ '<option value="1053">Jack of Clubs' 
			+ '<option value="1054">Queen of Clubs' 
			+ '<option value="1055">King of Clubs' 
			+ '<option value="1056">Ace of Clubs' 
		+ '<option value="QueueSet_7" style="color:#33FF00;"><< BOXING COLLECTION >>' 
			+ '<option value="1085">Hand Tape' 
			+ '<option value="1086">Gloves' 
			+ '<option value="1087">Headgear' 
			+ '<option value="1088">Boxing Trunks' 
			+ '<option value="1089">Speed Bag' 
			+ '<option value="1090">Heavy Bag' 
			+ '<option value="1091">Boxing Ring' 
		+ '<option value="QueueSet_7" style="color:#33FF00;"><< CIGARS COLLECTION >>' 
			+ '<option value="1001">Ebony Cigar' 
			+ '<option value="1002">Sky Cigar' 
			+ '<option value="1003">Rose Cigar' 
			+ '<option value="1004">Ivory Cigar' 
			+ '<option value="1005">Turquoise Cigar' 
			+ '<option value="1006">Gold Cigar' 
			+ '<option value="1007">Royal Cigar' 
		+ '<option value="QueueSet_7" style="color:#33FF00;"><< SPADE FLUSH COLLECTION >>' 
			+ '<option value="1057">Eight of Spades' 
			+ '<option value="1058">Nine of Spades' 
			+ '<option value="1059">Ten of Spades' 
			+ '<option value="1060">Jack of Spades' 
			+ '<option value="1061">Queen of Spades' 
			+ '<option value="1062">King of Spades' 
			+ '<option value="1063">Ace of Spades' 
		+ '<option value="QueueSet_7" style="color:#33FF00;"><< BILLIARDS COLLECTION >>' 
			+ '<option value="1092">One Ball' 
			+ '<option value="1093">Two Ball' 
			+ '<option value="1094">Three Ball' 
			+ '<option value="1095">Four Ball' 
			+ '<option value="1096">Five Ball' 
			+ '<option value="1097">Cue Ball' 
			+ '<option value="1098">Eight Ball' 
		+ '<option value="QueueSet_7" style="color:#33FF00;"><< RINGS COLLECTION >>' 
			+ '<option value="1008">Topaz Ring' 
			+ '<option value="1009">Opal Ring' 
			+ '<option value="1010">Amethyst Ring' 
			+ '<option value="1011">Emerald Ring' 
			+ '<option value="1012">Sapphire Ring' 
			+ '<option value="1013">Ruby Ring' 
			+ '<option value="1014">Diamond Ring' 
		+ '<option value="QueueSet_7" style="color:#33FF00;"><< TIES COLLECTION >>' 
			+ '<option value="1064">Solid Tie' 
			+ '<option value="1065">Striped Tie' 
			+ '<option value="1066">Checked Tie' 
			+ '<option value="1067">Geometric Tie' 
			+ '<option value="1068">Dot Tie' 
			+ '<option value="1069">Paisley Tie' 
			+ '<option value="1070">Knitted Tie' 
		+ '<option value="QueueSet_7" style="color:#33FF00;"><< PAINTINGS COLLECTION >>' 
			+ '<option value="1015">Warhol Painting' 
			+ '<option value="1016">Cezanne Painting' 
			+ '<option value="1017">Matisse Painting' 
			+ '<option value="1018">Van Gogh Painting' 
			+ '<option value="1019">Dali Painting' 
			+ '<option value="1020">Monet Painting' 
			+ '<option value="1021">Rembrandt Painting' 
		+ '<option value="QueueSet_7" style="color:#33FF00;"><< CUFFLINKS COLLECTION >>' 
			+ '<option value="1071">Silver Cufflinks' 
			+ '<option value="1072">Gold Cufflinks' 
			+ '<option value="1073">Amber Cufflinks' 
			+ '<option value="1074">Jasper Cufflinks' 
			+ '<option value="1075">Agate Cufflinks' 
			+ '<option value="1076">Onyx Cufflinks' 
			+ '<option value="1077">Pearl Cufflinks' 
		+ '<option value="QueueSet_7" style="color:#33FF00;"><< BARBER COLLECTION >>' 
			+ '<option value="1099">Barber Pole' 
			+ '<option value="1100">Razor' 
			+ '<option value="1101">Brush' 
			+ '<option value="1102">Seat' 
			+ '<option value="1103">Towel' 
			+ '<option value="1104">Scissors' 
			+ '<option value="1105">Cream' 
		+ '<option value="QueueSet_7" style="color:#33FF00;"><< GREAT RACE HORSES COLLECTION >>' 
			+ '<option value="1078">Mill Reef' 
			+ '<option value="1079">Sea Bird' 
			+ '<option value="1080">Arkle' 
			+ '<option value="1081">Golden Miller' 
			+ '<option value="1082">St Simon' 
			+ '<option value="1083">Ormonde' 
			+ '<option value="1084">Eclipse' 
		+ '<option value="QueueSet_7" style="color:#33FF00;"><< MONEY LAUNDERING COLLECTION >>' 
			+ '<option value="1113">Money Iron' 
			+ '<option value="1114">Dirty Laundry' 
			+ '<option value="1115">Dryer Sheets' 
			+ '<option value="1116">Money Line' 
			+ '<option value="1117">Roll of Quarters' 
			+ '<option value="1118">Death by Detergent' 
			+ '<option value="1119">Dirty Bra' 
		+ '<option value="QueueSet_7" style="color:#33FF00;"><< DAILY CHANCE COLLECTION >>' 
			+ '<option value="1106">Bingo Card' 
			+ '<option value="1107">Deck of Cards' 
			+ '<option value="1108">Dice' 
			+ '<option value="1109">Roulette Wheel' 
			+ '<option value="1110">Slot Machine' 
			+ '<option value="1111">Craps Table' 
			+ '<option value="1112">Baccarat Shoe';
	
	var moscow_collection = '<option value="QueueSet_48" style="color:rgb(255, 217, 39); font-size=25px;"><< MOSCOW COLLECTION >>' 
		+ '<option value="QueueSet_7" style="color:#33FF00;"><< PRISON TATTOOS COLLECTION >>' 
			+ '<option value="3001">Rose Tattoo' 
			+ '<option value="3002">Church Tattoo' 
			+ '<option value="3003">Star Tattoo' 
			+ '<option value="3004">Spider Tattoo' 
			+ '<option value="3005">Tiger Tattoo' 
			+ '<option value="3006">Skull Tattoo' 
			+ '<option value="3007">Crucifix Tattoo' 
		+ '<option value="QueueSet_7" style="color:#33FF00;"><< MATRYOSHKA DOLLS COLLECTION >>' 
			+ '<option value="3008">Natalya\'s Doll' 
			+ '<option value="3009">Olga\'s Doll' 
			+ '<option value="3010">Oksana\'s Doll' 
			+ '<option value="3011">Svetlana\'s Doll' 
			+ '<option value="3012">Tatyana\'s Doll' 
			+ '<option value="3013">Anastasiya\'s Doll' 
			+ '<option value="3014">Ekaterina\'s Doll' 
		+ '<option value="QueueSet_7" style="color:#33FF00;"><< RUSSIAN LEADERS COLLECTION >>' 
			+ '<option value="3015">Medal of Gorbachev' 
			+ '<option value="3016">Medal of Yeltsin' 
			+ '<option value="3017">Medal of Brezhnev' 
			+ '<option value="3018">Medal of Kruschev' 
			+ '<option value="3019">Medal of Putin' 
			+ '<option value="3020">Medal of Stalin' 
			+ '<option value="3021">Medal of Lenin' 
		+ '<option value="QueueSet_7" style="color:#33FF00;"><< VODKA DRINKS COLLECTION >>' 
			+ '<option value="3022">Cosmopolitan' 
			+ '<option value="3023">Screwdriver' 
			+ '<option value="3024">Sex on the Beach' 
			+ '<option value="3025">Bloody Mary' 
			+ '<option value="3026">Black Russian' 
			+ '<option value="3027">White Russian' 
			+ '<option value="3028">Soviet' 
		+ '<option value="QueueSet_7" style="color:#33FF00;"><< SOVIET MEMORABILIA COLLECTION >>' 
			+ '<option value="3029">Red Star' 
			+ '<option value="3030">Kremlin' 
			+ '<option value="3031">Communist Manifesto' 
			+ '<option value="3032">Propaganda Poster' 
			+ '<option value="3033">Hammer' 
			+ '<option value="3034">Sickle' 
			+ '<option value="3035">Bust of Lenin' 
		+ '<option value="QueueSet_7" style="color:#33FF00;"><< FABERGE EGGS COLLECTION >>' 
			+ '<option value="3036">Diamond Trellis Egg' 
			+ '<option value="3037">Jade Egg' 
			+ '<option value="3038">Military Egg' 
			+ '<option value="3039">Pansy Egg' 
			+ '<option value="3040">Rainbow Egg' 
			+ '<option value="3041">Winter Egg' 
			+ '<option value="3042">Peter the Great Egg';
	
	var bangkok_colection = '<option value="QueueSet_40" style="color:rgb(255, 217, 39); font-size=25px;"><< BANGKOK COLLECTIONS >>' 
		+ '<option value="QueueSet_7" style="color:#33FF00;"><< CHESS SET COLLECTION >>' 
			+ '<option value="4001">Chessboard' 
			+ '<option value="4002">Pawn' 
			+ '<option value="4003">Knight'
			+ '<option value="4004">Bishop' 
			+ '<option value="4005">Rook' 
			+ '<option value="4006">Queen'
			+ '<option value="4007">King' 
		+ '<option value="QueueSet_7" style="color:#33FF00;"><< MASKS COLLECTION >>' 
			+ '<option value="4008">Agat-Talai\'s Mask' 
			+ '<option value="4009">Sukreep\'s Mask' 
			+ '<option value="4010">Palee\'s Mask' 
			+ '<option value="4011">Phra Ram\'s Mask' 
			+ '<option value="4012">Indrachit\'s Mask' 
			+ '<option value="4013">Hanuman\'s Mask' 
			+ '<option value="4014">Tosakanth\'s Mask' 
		+ '<option value="QueueSet_7" style="color:#33FF00;"><< SPICES COLLECTION >>' 
			+ '<option value="4015">Coriander' 
			+ '<option value="4016">Garlic' 
			+ '<option value="4017">Turmeric' 
			+ '<option value="4018">Green Peppercorn' 
			+ '<option value="4019">Holy Basil' 
			+ '<option value="4020">Lemongrass' 
			+ '<option value="4021">Thai Chili' 
		+ '<option value="QueueSet_7" style="color:#33FF00;"><< CARVINGS COLLECTION >>' 
			+ '<option value="4022">Wall Carving' 
			+ '<option value="4023">Floral Statue' 
			+ '<option value="4024">Dragon Statue' 
			+ '<option value="4025">Decorative Nightstand' 
			+ '<option value="4026">Lotus Bloom' 
			+ '<option value="4027">Rearing Elephant' 
			+ '<option value="4028">Stone Buddha' 
		+ '<option value="QueueSet_7" style="color:#33FF00;"><< ORCHIDS COLLECTION >>' 
			+ '<option value="4029">Marco Polo' 
			+ '<option value="4030">Grace Pink' 
			+ '<option value="4031">Misteen' 
			+ '<option value="4032">Jade Siam' 
			+ '<option value="4033">Bom Gold' 
			+ '<option value="4034">Bom Blue' 
			+ '<option value="4035">Fatima';
			
	var vegas_collection = '<option value="QueueSet_56" style="color:rgb(255, 217, 39); font-size=25px;"><< LAS VEGAS COLLECTIONS >>' 
		+ '<option value="QueueSet_7" style="color:#33FF00;"><< CACTUS COLLECTION >>' 
			+ '<option value="5036">Christmas Cactus' 
			+ '<option value="5037">Silver Cholla' 
			+ '<option value="5038">Cottontop Cactus' 
			+ '<option value="5039">Hedgehog Cactus' 
			+ '<option value="5040">Prickly Pear Cactus' 
			+ '<option value="5041">Barrel Cactus' 
			+ '<option value="5042">Saguaro' 
		+ '<option value="QueueSet_7" style="color:#33FF00;"><< MOJAVE ANIMALS COLLECTION >>' 
			+ '<option value="5043">JackRabbit' 
			+ '<option value="5044">Coyote' 
			+ '<option value="5045">Roadrunner' 
			+ '<option value="5046">Rattlesnake' 
			+ '<option value="5047">Kit Fox' 
			+ '<option value="5048">Golden Eagle' 
			+ '<option value="5049">Mountain Lion' 
		+ '<option value="QueueSet_7" style="color:#33FF00;"><< POKER HANDS COLLECTION >>' 
			+ '<option value="5050">Pair' 
			+ '<option value="5051">Two Pair' 
			+ '<option value="5052">Three of a Kind' 
			+ '<option value="5053">Full House' 
			+ '<option value="5056">Four of a Kind' 
			+ '<option value="5054">Straight Flush' 
			+ '<option value="5055">Joker' 
		+ '<option value="QueueSet_7" style="color:#33FF00;"><< MATCHBOOKS COLLECTION >>' 
			+ '<option value="5057">Loot Isle Casino' 
			+ '<option value="5058">Camelot Hotel' 
			+ '<option value="5059">Giza Las Vegas' 
			+ '<option value="5060">Florentine Resort' 
			+ '<option value="5061">Soft Rock Casino' 
			+ '<option value="5062">Jersey' 
			+ '<option value="5063">Planet Bollywood' 
		+ '<option value="QueueSet_7" style="color:#33FF00;"><< PANTHEON TROPHIES COLLECTION >>' 
			+ '<option value="705001">Atlas Trophy' 
			+ '<option value="705002">Herculean Trophy' 
			+ '<option value="705003">Ares Trophy' 
			+ '<option value="705004">Zeus Trophy' 
			+ '<option value="705005">Athena Trophy' 
			+ '<option value="705006">Artemis Trophy' 
			+ '<option value="705007">Poseidon Trophy' 
		+ '<option value="QueueSet_7" style="color:#33FF00;"><< CONTINENTAL RINGS COLLECTION >>' 
			+ '<option value="705008">Oceania Ring' 
			+ '<option value="705009">Europe Ring' 
			+ '<option value="705010">Asia Ring' 
			+ '<option value="705011">South America Ring' 
			+ '<option value="705012">North America Ring' 
			+ '<option value="705013">Antartica Ring' 
			+ '<option value="705014">Africa Ring' 
		+ '<option value="QueueSet_7" style="color:#33FF00;"><< CHAMPIONSHIP BELTS COLLECTION >>' 
			+ '<option value="705015">City Belt' 
			+ '<option value="705016">State Belt' 
			+ '<option value="705017">Regional Belt' 
			+ '<option value="705018">National Belt' 
			+ '<option value="705019">Continental Belt' 
			+ '<option value="705020">World Belt' 
			+ '<option value="705021">Universal Belt';
	
	var italy_collection = '<option value="QueueSet_32" style="color:rgb(255, 217, 39); font-size=25px;"><< ITALY COLLECTIONS >>' 
		+ '<option value="QueueSet_7" style="color:#33FF00;"><< DINNER IS SERVED COLLECTION >>' 
			+ '<option value="6001">Toasted Ravioli' 
			+ '<option value="6002">Traditional Pizza' 
			+ '<option value="6003">Calzone' 
			+ '<option value="6004">Gnocchi' 
			+ '<option value="6005">Meatballs' 
			+ '<option value="6006">Gelato' 
			+ '<option value="6007">Cioppino' 
		+ '<option value="QueueSet_7" style="color:#33FF00;"><< ROMAN STANDARDS COLLECTION >>' 
			+ '<option value="6008">Banner' 
			+ '<option value="6009">Capitoline' 
			+ '<option value="6010">Castle' 
			+ '<option value="6011">Centurion' 
			+ '<option value="6012">Eagle' 
			+ '<option value="6013">Flag' 
			+ '<option value="6014">Palm' 
		+ '<option value="QueueSet_7" style="color:#33FF00;"><< THE GREAT INVENTOR COLLECTION >>' 
			+ '<option value="6015">Bones of Man' 
			+ '<option value="6016">Mother with Child' 
			+ '<option value="6017">Portrait' 
			+ '<option value="6018">Helicopter Scroll' 
			+ '<option value="6019">Vitruvian Man' 
			+ '<option value="6020">Tank' 
			+ '<option value="6021">Crossbow' 
		+ '<option value="QueueSet_7" style="color:#33FF00;"><< FAMOUS RULERS COLLECTION >>' 
			+ '<option value="6022">Marius' 
			+ '<option value="6023">Caesar' 
			+ '<option value="6024">Augustus' 
			+ '<option value="6025">Nero' 
			+ '<option value="6026">Trajan' 
			+ '<option value="6027">Constantine' 
			+ '<option value="6028">Justinian';
	
	var london_collection = '<option value="QueueSet_64" style="color:rgb(255, 217, 39); font-size=25px;"><< LONDON COLLECTIONS >>' 
		+ '<option value="QueueSet_7" style="color:#33FF00;"><< TRAINING DAY COLLECTION >>' 
			+ '<option value="9001">Rubberized Medicine Ball' 
			+ '<option value="9002">Skipping Rope' 
			+ '<option value="9003">Versatile Resistance Trainer' 
			+ '<option value="9004">Punching Bag' 
			+ '<option value="9005">Speed Bag' 
			+ '<option value="9006">Dump-bells' 
			+ '<option value="9007">Exercise Hand Grip' 
		+ '<option value="QueueSet_7" style="color:#33FF00;"><< DAILY WAGES COLLECTION >>' 
			+ '<option value="9008">Weights' 
			+ '<option value="9009">Weaving Tool' 
			+ '<option value="9010">Garbage Bag' 
			+ '<option value="9011">Shoe Horn' 
			+ '<option value="9012">Sewing Machine' 
			+ '<option value="9013">Tower Pincer' 
			+ '<option value="9014">Washing Bat' 
		+ '<option value="QueueSet_7" style="color:#33FF00;"><< HEEL HATH NO FURY COLLECTION >>' 
			+ '<option value="9015">Cone Heels' 
			+ '<option value="9016">Kitten Heels' 
			+ '<option value="9017">Platform Heels' 
			+ '<option value="9018">Stilettos' 
			+ '<option value="9019">Spool Heels' 
			+ '<option value="9020">Wedge Heels' 
			+ '<option value="9021">Prism Heels'
		+ '<option value="QueueSet_7" style="color:#33FF00;"><< Pretenders Collection >>' 
			+ '<option value="9022">Sideburns' 
			+ '<option value="9023">Bald Cap' 
			+ '<option value="9024">Fake Nails' 
			+ '<option value="9025">Toupee' 
			+ '<option value="9026">Contact Lenses' 
			+ '<option value="9027">Fake Mustache' 
			+ '<option value="9028">Fake Teeth' 
		+ '<option value="QueueSet_7" style="color:#33FF00;"><< Back to School Collection >>' 
			+ '<option value="9029">Blackboard' 
			+ '<option value="9030">Chalk Duster' 
			+ '<option value="9031">Wooden Ruler' 
			+ '<option value="9032">Lunch Box' 
			+ '<option value="9033">Locker' 
			+ '<option value="9034">School Bag' 
			+ '<option value="9035">Pencil' 
		+ '<option value="QueueSet_7" style="color:#33FF00;"><< Hi-Tech Collection >>' 
			+ '<option value="9036">Bulletproof Watch' 
			+ '<option value="9037">Video Watch' 
			+ '<option value="9038">Car of Tomorrow' 
			+ '<option value="9039">Hologram' 
			+ '<option value="9040">Earpiece' 
			+ '<option value="9041">Mini Mic' 
			+ '<option value="9042">Third Eye'
		+ '<option value="QueueSet_7" style="color:#33FF00;"><< Day Care Collection >>' 
			+ '<option value="9043">Rubber Ducky' 
			+ '<option value="9044">Pacifier' 
			+ '<option value="9045">Bib' 
			+ '<option value="9046">Rattle' 
			+ '<option value="9047">Pram' 
			+ '<option value="9048">Milk Bottle' 
			+ '<option value="9049">Cradle' 
		+ '<option value="QueueSet_7" style="color:#33FF00;"><< Credited Collection >>' 
			+ '<option value="9050">Money Counter' 
			+ '<option value="9051">Bank Box' 
			+ '<option value="9052">Bank Token' 
			+ '<option value="9053">Pass Book' 
			+ '<option value="9054">ATM Card' 
			+ '<option value="9055">Panic Button' 
			+ '<option value="9056">Sealed Vault';
	
	var chicago_collection = '<option value="QueueSet_48" style="color:rgb(255, 217, 39); font-size=25px;"><< CHICAGO COLLECTIONS >>' 
		+ '<option value="QueueSet_7" style="color:#33FF00;"><< CAR BONNETS COLLECTION >>' 
			+ '<option value="8001">Aphrodite\'s Bonnet' 
			+ '<option value="8002">Big Shot Bonnet' 
			+ '<option value="8003">Dash Bonnet' 
			+ '<option value="8004">Eagle Bonnet' 
			+ '<option value="8005">Lion Bonnet' 
			+ '<option value="8006">Skull Bonnet' 
			+ '<option value="8007">Stallion Bonnet' 
		+ '<option value="QueueSet_7" style="color:#33FF00;"><< STICKPINS COLLECTION >>' 
			+ '<option value="8008">Amber Star Stickpin' 
			+ '<option value="8009">Carved Emerald Stickpin' 
			+ '<option value="8010">Diamond Stickpin' 
			+ '<option value="8011">Middle Aisle Stickpin' 
			+ '<option value="8012">Pearl Stickpin' 
			+ '<option value="8013">Rose Stickpin' 
			+ '<option value="8014">Shield Stickpin' 
		+ '<option value="QueueSet_7" style="color:#33FF00;"><< SHARP DRESSERS COLLECTION >>' 
			+ '<option value="8015">6-button Long Coat' 
			+ '<option value="8016">4-button Pinstriped Suit' 
			+ '<option value="8017">Double Breasted Suit' 
			+ '<option value="8018">Gabardine suit' 
			+ '<option value="8019">Glad Rags' 
			+ '<option value="8020">Swanky Moll Suit' 
			+ '<option value="8021">Glamour Flapper Dress'
		+ '<option value="QueueSet_7" style="color:#33FF00;"><< FEDORA COLLECTION >>' 
			+ '<option value="8022">Diamond Crowned Fedora' 
			+ '<option value="8023">Borsalino Wide-Brimmed' 
			+ '<option value="8024">Cavanagh Edge' 
			+ '<option value="8025">Narrow-Brimmed Triby' 
			+ '<option value="8026">Bowler Hat' 
			+ '<option value="8027">Bell Hat' 
			+ '<option value="8042">Single Dent Homburg' 
		+ '<option value="QueueSet_7" style="color:#33FF00;"><< TIE ONE ON COLLECTION >>' 
			+ '<option value="8028">Four-Point Fold Black Silk' 
			+ '<option value="8029">Three-Point Fold White Silk' 
			+ '<option value="8030">Two-Point Fold Green Silk' 
			+ '<option value="8031">Two-Point Fold Red Linen' 
			+ '<option value="8032">One-Point Fold Canary Linen' 
			+ '<option value="8033">Straight Shell Blue Cotton' 
			+ '<option value="8034">Puff Fold Gray Cotton' 
		+ '<option value="QueueSet_7" style="color:#33FF00;"><< JOCKEY JACKET COLLECTION >>' 
			+ '<option value="8035">Triple Victory' 
			+ '<option value="8036">Double Stride' 
			+ '<option value="8037">Copacetic' 
			+ '<option value="8038">Checkered' 
			+ '<option value="8039">All Sixes' 
			+ '<option value="8040">Get a Wiggle On' 
			+ '<option value="8041">Java and Joe';
	
	var brazil_collection = '<option value="QueueSet_40" style="color:rgb(255, 217, 39); font-size=25px;"><< BRAZIL COLLECTIONS >>' 
		+ '<option value="QueueSet_7" style="color:#33FF00;"><< BEACHES COLLECTION >>' 
			+ '<option value="7001">Pinho' 
			+ '<option value="7002">Jericoacoara' 
			+ '<option value="7003">Ipanema' 
			+ '<option value="7004">Recife' 
			+ '<option value="7005">Ponta Negra' 
			+ '<option value="7006">Florianopolis' 
			+ '<option value="7007">Canoa Quebrada' 
		+ '<option value="QueueSet_7" style="color:#33FF00;"><< MUSICAL INSTRUMENTS COLLECTION >>' 
			+ '<option value="7008">Agogo' 
			+ '<option value="7009">Atabaque' 
			+ '<option value="7010">Bateria' 
			+ '<option value="7011">Ganzá' 
			+ '<option value="7012">Pandeiro' 
			+ '<option value="7013">Skekere/Xequerê' 
			+ '<option value="7014">Tamborim' 
		+ '<option value="QueueSet_7" style="color:#33FF00;"><< AMAZONIAN PLANTS COLLECTION >>' 
			+ '<option value="7015">Dutchman\'s Pipe' 
			+ '<option value="7016">Giant Amazon Water Lily' 
			+ '<option value="7017">Tabebuia' 
			+ '<option value="7018">Amazon Coral Tree' 
			+ '<option value="7019">Passion Fruit' 
			+ '<option value="7020">Banana Plant' 
			+ '<option value="7021">White Flowers' 
		+ '<option value="QueueSet_7" style="color:#33FF00;"><< DRINKS COLLECTION >>' 
			+ '<option value="7022">West Rum Caipirinha' 
			+ '<option value="7023">Leite de Onça' 
			+ '<option value="7024">Agua de Coco' 
			+ '<option value="7025">Chimarrão' 
			+ '<option value="7026">Vinho Quente' 
			+ '<option value="7027">Cerveja' 
			+ '<option value="7028">Lucky Lucas' 
		+ '<option value="QueueSet_7" style="color:#33FF00;"><< HEAD DRESSES COLLECTION >>' 
			+ '<option value="7029">Golden Goddess' 
			+ '<option value="7030">Red Dawn' 
			+ '<option value="7031">Green Canopy' 
			+ '<option value="7032">Black Midnight' 
			+ '<option value="7033">Jungle Vines' 
			+ '<option value="7034">Purple Plume' 
			+ '<option value="7035">Sun Shine';

// **** TOP 10 LOOT ****

	var top10_loot = '<option style="color:#33FF00;" value="QueueSet_10">-- TOP 10 LOOT --' 
		+ '<Option value="11057">Sugar Daddy (A91 D61)' 
		+ '<Option value="5682">Jungle Hacker (A57 D85)' 
		+ '<Option value="11060">Smoke Eater (A86 D56)' 
		+ '<Option value="1997">Climber Leggings (A50 D85)' 
		+ '<Option value="11061">Dapper Flapper (A96 D63)' 
		+ '<Option value="11064">Schooner (A55 D88)' 
		+ '<Option value="2789">Wildebeest (A85 D64)' 
		+ '<Option value="2670">Golden Poison Frog (A30 D75)' 
		+ '<Option value="2794">Strong Arm (A84 D68)' 
		+ '<Option value="2936">Cab Driver (A45 D85)';

// **** HENCHMEN LOOT ****
		
	var henchmen_loot = '<Option style="color:#33FF00;" value="QueueSet_2">-- HENCHMEN LOOT --' 
		+ '<Option value="5502">Amazon River Guide (A30 D16)' 
		+ '<Option value="2480">Anubian Cultist (A76 D76)' 
		+ '<Option value="544">Armed Doorman (A51 D24)' 
		+ '<Option value="45">Armed Guard (A8 D25)' 
		+ '<Option value="1300">Assault Trooper (A22 D35)' 
		+ '<Option value="2335">Avalanche (A32 D67)' 
		+ '<Option value="3008">Bad Habit (A46 D78)' 
		+ '<Option value="2350">Benny Blanco (A78 D50)' 
		+ '<Option value="57">Body Double (A10 D25)' 
		+ '<Option value="18">Bodyguard (A8 D25)' 
		+ '<Option value="2936">Cab Driver (A45 D85)' 
		+ '<Option value="758">Casino Guard (A48 D28)' 
		+ '<Option value="2077">Club Owner (A16 D23)' 
		+ '<Option value="726">Con Man (A60 D35)' 
		+ '<Option value="516">Cupid (A46 D27)' 
		+ '<Option value="506">Cupid\'s Hit Squad (A47 D22)' 
		+ '<Option value="484">Deadly Armed Guard (A12 D28)' 
		+ '<Option value="483">Deadly Body Double (A25 D45)' 
		+ '<Option value="444">Drago (A15 D25)' 
		+ '<Option value="987">Elvis Impersonator (A20 D48)' 
		+ '<Option value="523">EMT (A18 D35)' 
		+ '<Option value="1015">Ex-KGB Bodyguard (A48 D30)' 
		+ '<Option value="461">Ex-SEAL (A27 D45)' 
		+ '<Option value="78">Federal Agent (A15 D25)' 
		+ '<Option value="2063">Femme Fatale (A45 D28)' 
		+ '<Option value="7037">Femme Shot (A81 D45)' 
		+ '<Option value="458">Frogman (A40 D24)' 
		+ '<Option value="997">FSB Agent (A42 D76)' 
		+ '<Option value="326">Ghost Thug (A10 D20)' 
		+ '<Option value="2152">Gluttony (A63 D30)' 
		+ '<Option value="1842">Goalie (A45 D58)' 
		+ '<Option value="188">Guardia Presidencial (A42 D32)' 
		+ '<Option value="317">Guerilla Bodyguard (A25 D44)' 
		+ '<Option value="190">Guerrilla Commando (A38 D35)' 
		+ '<Option value="174">Guerrilla Squad (A34 D30)' 
		+ '<Option value="5405">Heavy Assault Squad (A31 D58)' 
		+ '<Option value="510">Hidden Sentry (A9 D22)' 
		+ '<Option value="2165">Hopped-Up Thug (A56 D18)' 
		+ '<Option value="496">Hung Chu Enforcer (A16 D24)' 
		+ '<Option value="1037">Irish Traveler (A52 D63)' 
		+ '<Option value="1786">Italian Housekeeper (A76 D35)' 
		+ '<Option value="1861">Italian Housekeeper (A80 D38)' 
		+ '<Option value="1862">Italian Housekeeper (A83 D40)' 
		+ '<Option value="2151">Lust (A29 D62)' 
		+ '<Option value="8082">Mamacita (A80 D44)' 
		+ '<Option value="8083">Mamacita (A83 D45)' 
		+ '<Option value="8084">Mamacita (A84 D47)' 
		+ '<Option value="1512">Muai Thai Bodyguard (A18 D25)' 
		+ '<Option value="1545">Ninja (A47 D35)' 
		+ '<Option value="217">Off Duty Cop (A22 D18)' 
		+ '<Option value="771">One-Armed Bandit (A28 D50)' 
		+ '<Option value="396">Pair of Santa\'s Helpers (A26 D8)' 
		+ '<Option value="697">Parisian Fixer (A30 D61)' 
		+ '<Option value="1054">Pulcinella (A45 D56)' 
		+ '<Option value="1498">Rat Pack (A29 D60)' 
		+ '<Option value="2066">Reinhardt and Otto (A57 D36)' 
		+ '<Option value="2061">Rhinestone Cowboy (A33 D25)' 
		+ '<Option value="605">Road Block Crew (A26 D38)' 
		+ '<Option value="708">Rogue CIA Agent (A69 D30)' 
		+ '<Option value="1546">Royal Thai Marine (A33 D49)' 
		+ '<Option value="2452">Scissor Sister (A25 D51)' 
		+ '<Option value="1020">Shturmovik (A45 D28)' 
		+ '<Option value="343">Spetsnaz Operative (A38 D32)' 
		+ '<Option value="1785">Sports Fanatic (A74 D39)' 
		+ '<Option value="1818">Sports Fanatic (A77 D42)' 
		+ '<Option value="1819">Sports Fanatic (A80 D45)' 
		+ '<Option value="1820">Sports Fanatic (A84 D49)' 
		+ '<Option value="883">Spy (A62 D44)' 
		+ '<Option value="204">Street Gang Member (A20 D14)' 
		+ '<Option value="7050">Strike Soldier (A40 D68)' 
		+ '<Option value="2794">Strong Arm (A84 D68)' 
		+ '<Option value="1118">Strong Arm (A73 D56)' 
		+ '<Option value="495">Sumotori Fighter (A17 D25)' 
		+ '<Option value="1552">Swiss Banker (A27 D54)' 
		+ '<Option value="5339">Swiss Guard (A59 D69)' 
		+ '<Option value="8079">Tail Gunner (A36 D76)' 
		+ '<Option value="8080">Tail Gunner (A37 D80)' 
		+ '<Option value="8081">Tail Gunner (A39 D82)' 
		+ '<Option value="2353">Tax Collector (A52 D82)' 
		+ '<Option value="505">Temple Guardian (A27 D45)' 
		+ '<Option value="1050">Teppista (A47 D29)' 
		+ '<Option value="1128">Thief (A71 D32)' 
		+ '<Option value="630">Thugs Bunny (A50 D28)' 
		+ '<Option value="7028">Tundra Commmando (A55 D79)' 
		+ '<Option value="993">Uncle Sam (A34 D61)' 
		+ '<Option value="2147">Union Leader (A67 D38)' 
		+ '<Option value="2126">Wetland Guide (A34 D71)' 
		+ '<Option value="265">White Shturmovik (A45 D28)' 
		+ '<Option value="321">YoZombie (A21 D18)'; 

// **** ATTACK >70 LOOT ****
		
	var att70_loot = '<Option style="color:#33FF00;" value="QueueSet_2">-- ATTACK 70\< LOOT --'
		+ '<Option value="11061">Dapper Flapper (A96 D63)' 
		+ '<Option value="11057">Sugar Daddy (A91 D61)' 
		+ '<Option value="11060">Smoke Eater (A86 D56)' 
		+ '<Option value="5701">Smuggler\'s Sub (A86 D58)' 
		+ '<Option value="7058">Chance (A85 D62)' 
		+ '<Option value="2476">Reaction Contraption (A85 D55)' 
		+ '<Option value="2801">Wasper Knife (A85 D65)' 
		+ '<Option value="2789">Wildebeest (A85 D64)' 
		+ '<Option value="1038">Black Irish (A84 D59)' 
		+ '<Option value="8084">Mamacita (A84 D47)' 
		+ '<Option value="8104">Man Eating Plant (A84 D54)' 
		+ '<Option value="2473">Mechanized Crocodilian (A84 D49)' 
		+ '<Option value="969">Silk Thunder (A84 D59)' 
		+ '<Option value="1820">Sports Fanatic (A84 D49)' 
		+ '<Option value="2794">Strong Arm (A84 D68)' 
		+ '<Option value="1315">Trio Incarnate (A84 D39)' 
		+ '<Option value="2354">W2 (A84 D53)' 
		+ '<Option value="8027">Army Cargo Carrier (A83 D57)' 
		+ '<Option value="1872">Flanger (A83 D48)' 
		+ '<Option value="1862">Italian Housekeeper (A83 D40)' 
		+ '<Option value="8083">Mamacita (A83 D45)' 
		+ '<Option value="8103">Man Eating Plant (A83 D51)' 
		+ '<Option value="5618">Northern Pike (A83 D56)' 
		+ '<Option value="8094">Nun Chucks (A83 D44)' 
		+ '<Option value="2800">Pair of Stun Knuckles (A83 D55)' 
		+ '<Option value="11056">Sinker (A83 D54)' 
		+ '<Option value="2468">Snowdrift (A83 D38)' 
		+ '<Option value="5374">Wendigo (A83 D50)' 
		+ '<Option value="2481">Amon Ra\'s Barge (A82 D45)' 
		+ '<Option value="2341">Earthquake (A82 D45)' 
		+ '<Option value="2402">Flicker (A82 D43)' 
		+ '<Option value="2449">Go Fast Boat (A82 D45)' 
		+ '<Option value="7052">Gungnir (A82 D60)' 
		+ '<Option value="2466">Igloo Shield (A82 D44)' 
		+ '<Option value="2714">Orangutan (A82 D68)' 
		+ '<Option value="5628">Ostrich Egg Bomb (A82 D41)' 
		+ '<Option value="2404">Pair of Security Gloves (A82 D38)' 
		+ '<Option value="2411">Plum Putter (A82 D42)' 
		+ '<Option value="7031">Savannah Patroller (A82 D50)' 
		+ '<Option value="2806">Sportster (A82 D62)' 
		+ '<Option value="5627">Crab Claw Cutter (A81 D37)' 
		+ '<Option value="7037">Femme Shot (A81 D45)' 
		+ '<Option value="2410">Killing Time (A81 D37)' 
		+ '<Option value="2352">Lamprey Eel (A81 D51)' 
		+ '<Option value="8093">Nun Chucks (A81 D42)' 
		+ '<Option value="2450">Rico\'s Revenge (A81 D37)' 
		+ '<Option value="989">Sin City Shooter (A81 D36)' 
		+ '<Option value="1929">Thermobaric Hand Grenade (A81 D50)' 
		+ '<Option value="1869">Thigh Will Be Done (A81 D36)' 
		+ '<Option value="2713">Zorse (A81 D66)' 
		+ '<Option value="1306">Aircraft Carrier (A80 D38)' 
		+ '<Option value="2445">Autumn Harvester (A80 D41)' 
		+ '<Option value="11062">Boby Grand (A80 D50)' 
		+ '<Option value="5284">Brigadier (A80 D52)' 
		+ '<Option value="2440">Chomps (A80 D37)' 
		+ '<Option value="869">Compression (A80 D37)' 
		+ '<Option value="1781">Flanger (A80 D45)' 
		+ '<Option value="1861">Italian Housekeeper (A80 D38)' 
		+ '<Option value="1771">King Cobra (A80 D62)' 
		+ '<Option value="2711">Leg Up (A80 D61)' 
		+ '<Option value="8082">Mamacita (A80 D44)' 
		+ '<Option value="8102">Man Eating Plant (A80 D49)' 
		+ '<Option value="2442">Nightmare Claw (A80 D41)' 
		+ '<Option value="2475">Perambulation (A80 D43)' 
		+ '<Option value="5626">Rainbow Boa (A80 D50)' 
		+ '<Option value="2485">Scythe Chariot (A80 D80)' 
		+ '<Option value="1819">Sports Fanatic (A80 D45)' 
		+ '<Option value="1568">WWII M4 Sherman (A80 D41)' 
		+ '<Option value="2439">Black Friday Mask (A79 D44)' 
		+ '<Option value="2696">Gaelic Crossbow (A79 D55)' 
		+ '<Option value="2786">Malayan Tiger (A79 D58)' 
		+ '<Option value="8092">Nun Chucks (A79 D41)' 
		+ '<Option value="868">Prism Armored Vest (A79 D41)' 
		+ '<Option value="2488">Rock Iguana (A79 D50)' 
		+ '<Option value="1776">Sheet Metal Blade (A79 D63)' 
		+ '<Option value="2792">Spotted Vest (A79 D59)' 
		+ '<Option value="2705">Talon (A79 D44)' 
		+ '<Option value="2463">Agave (A78 D42)' 
		+ '<Option value="2350">Benny Blanco (A78 D50)' 
		+ '<Option value="2710">Deimos Dagger (A78 D65)' 
		+ '<Option value="2798">Electric Prod (A78 D52)' 
		+ '<Option value="2490">Hellcat Cannon (A78 D55)' 
		+ '<Option value="2157">Pride (A78 D40)' 
		+ '<Option value="2703">Windswept (A78 D43)' 
		+ '<Option value="1927">Army Ants (A77 D51)' 
		+ '<Option value="2437">Astro Cruise (A77 D38)' 
		+ '<Option value="5372">Eku Oar Staff (A77 D48)' 
		+ '<Option value="5624">Jackalope (A77 D42)' 
		+ '<Option value="2347">Nightmare (A77 D37)' 
		+ '<Option value="4460">Road Razor (A77 D35)' 
		+ '<Option value="857">Shadow Transporter (A77 D60)' 
		+ '<Option value="1818">Sports Fanatic (A77 D42)' 
		+ '<Option value="1868">Thigh Will Be Done (A77 D33)' 
		+ '<Option value="780">War Wagon (A77 D43)' 
		+ '<Option value="2480">Anubian Cultist (A76 D76)' 
		+ '<Option value="4413">Black Backed Jackal (A76 D42)' 
		+ '<Option value="7025">Cape Buffalo (A76 D59)' 
		+ '<Option value="2348">Carlito\'s Way (A76 D44)' 
		+ '<Option value="2345">Doom Gauntlet (A76 D41)' 
		+ '<Option value="4459">Double-Reign Bow (A76 D39)' 
		+ '<Option value="2461">Dune Rider Jacket (A76 D29)' 
		+ '<Option value="5385">Eviscerator Boots (A76 D53)' 
		+ '<Option value="2804">Hunter \'Spy\' XS (A76 D55)' 
		+ '<Option value="1786">Italian Housekeeper (A76 D35)' 
		+ '<Option value="2406">Rappelling Gear (A76 D36)' 
		+ '<Option value="5292">Razorback (A76 D38)' 
		+ '<Option value="2414">Spear Storm (A76 D34)' 
		+ '<Option value="1843">Tiebreaker (A76 D42)' 
		+ '<Option value="1945">Total Eclipse (A76 D45)' 
		+ '<Option value="1795">Aluminum Bat (A75 D33)' 
		+ '<Option value="900">Aquatic Rifle (A75 D41)' 
		+ '<Option value="2409">Black Bear (A75 D34)' 
		+ '<Option value="4454">Blue Dragon Helm (A75 D52)' 
		+ '<Option value="4463">Copperhead (A75 D49)' 
		+ '<Option value="2460">Desert Lynx (A75 D36)' 
		+ '<Option value="698">French Kiss (A75 D45)' 
		+ '<Option value="2413">Gear Belt (A75 D29)' 
		+ '<Option value="4410">KAO Rockstar (A75 D41)' 
		+ '<Option value="2214">Markhor (A75 D37)' 
		+ '<Option value="2332">Offroad Racer (A75 D41)' 
		+ '<Option value="1926">Pacific Manta (A75 D50)' 
		+ '<Option value="5371">Plated Mini-Dress (A75 D41)' 
		+ '<Option value="2459">Sultan\'s Saber (A75 D37)' 
		+ '<Option value="2669">Venomous (A75 D34)' 
		+ '<Option value="1131">House Fire (A74 D35)' 
		+ '<Option value="2361">Iron And Silk (A74 D73)' 
		+ '<Option value="5349">Roman Legion (A74 D58)' 
		+ '<Option value="5350">Sea Eagle (A74 D55)' 
		+ '<Option value="1785">Sports Fanatic (A74 D39)' 
		+ '<Option value="1782">Thigh Will Be Done (A74 D30)' 
		+ '<Option value="2668">Toxic Gas Scrubber (A74 D37)' 
		+ '<Option value="2784">Warthog (A74 D60)' 
		+ '<Option value="1114">Wildebeest (A74 D54)' 
		+ '<Option value="2111">Yak (A74 D43)' 
		+ '<Option value="5289">Crystalline (A73 D35)' 
		+ '<Option value="5621">Deft Touch (A73 D44)' 
		+ '<Option value="2303">Garrotte (A73 D44)' 
		+ '<Option value="5614">Gray Tail Rifle (A73 D40)' 
		+ '<Option value="4480">Grizzly Man-Eater (A73 D33)' 
		+ '<Option value="2211">Rex Fang (A73 D35)' 
		+ '<Option value="2330">Slicer Pistol (A73 D43)' 
		+ '<Option value="4473">Spinal Jacket (A73 D32)' 
		+ '<Option value="1130">Storm Chaser (A73 D30)' 
		+ '<Option value="1118">Strong Arm (A73 D56)' 
		+ '<Option value="2666">Tiger Claw (A73 D56)' 
		+ '<Option value="1922">9mm Fury (A72 D49)' 
		+ '<Option value="886">Exploding Pumpkin (A72 D33)' 
		+ '<Option value="2306">Fish Spear (A72 D45)' 
		+ '<Option value="2202">Green Mamba (A72 D39)' 
		+ '<Option value="1132">Hail Storm Jacket (A72 D36)' 
		+ '<Option value="5290">Harpoon GT (A72 D43)' 
		+ '<Option value="1768">Hook Sword (A72 D51)' 
		+ '<Option value="891">Infiltration Gear (A72 D40)' 
		+ '<Option value="2663">Lantern Fish (A72 D51)' 
		+ '<Option value="2664">Pirahna XE (A72 D55)' 
		+ '<Option value="2127">Swamp Buggy (A72 D32)' 
		+ '<Option value="2425">War Rhino (A72 D31)' 
		+ '<Option value="1794">Aluminum Bat (A71 D30)' 
		+ '<Option value="12001">Christmas Cupcakes (A71 D45)' 
		+ '<Option value="2424">Clear Path (A71 D33)' 
		+ '<Option value="1921">Climbing Claws (A71 D45)' 
		+ '<Option value="1764">Curled Horn Helm (A71 D51)' 
		+ '<Option value="2339">Famine (A71 D36)' 
		+ '<Option value="5335">Holy Hand Grenade (A71 D57)' 
		+ '<Option value="904">Infighter (A71 D44)' 
		+ '<Option value="4478">N7 Tomahawk (A71 D28)' 
		+ '<Option value="2661">Pesce Spada (A71 D35)' 
		+ '<Option value="5409">Quilled Wristguard (A71 D49)' 
		+ '<Option value="1770">Rhino Helmet (A71 D49)' 
		+ '<Option value="1775">Scottish Wild Cat (A71 D50)' 
		+ '<Option value="2110">Spoleto (A71 D39)' 
		+ '<Option value="1128">Thief (A71 D32)' 
		+ '<Option value="873">D-07 Proximity Mine (A70 D39)' 
		+ '<Option value="7044">Emu Ghillie Suit (A70 D39)' 
		+ '<Option value="5412">Foxer (A70 D55)' 
		+ '<Option value="2658">Good Neighbor (A70 D47)' 
		+ '<Option value="1908">HyroTM Torso Guard (A70 D31)' 
		+ '<Option value="1762">Juvenile Tiger (A70 D51)' 
		+ '<Option value="1757">Lady Luck\'s Tessan (A70 D38)' 
		+ '<Option value="1722">Legacy (A70 D47)' 
		+ '<Option value="7047">Mobile Fortress (A70 D42)' 
		+ '<Option value="646">Silenced Sniper Rifle (A70 D28)' 
		+ '<Option value="2337">Tornado (A70 D39)'; 

// **** DEFENSE >70 LOOT ****
		
	var def70_loot = '<Option style="color:#33FF00;" value="QueueSet_2">-- DEFENSE 70\< LOOT --'
		+ '<Option value="11064">Schooner (A55 D88)' 
		+ '<Option value="2795">Stout Shoulders (A65 D85)' 
		+ '<Option value="2484">Sun Spider (A61 D85)' 
		+ '<Option value="5682">Jungle Hacker (A57 D85)' 
		+ '<Option value="5619">North American Porcupine (A51 D85)' 
		+ '<Option value="1997">Climber Leggings (A50 D85)' 
		+ '<Option value="5411">Mugger Crocodile (A46 D85)' 
		+ '<Option value="2936">Cab Driver (A45 D85)' 
		+ '<Option value="1871">Fallen Angel Arm (A42 D85)' 
		+ '<Option value="2807">Extended Cab 640 (A62 D84)' 
		+ '<Option value="8028">Ebon Severer (A56 D84)' 
		+ '<Option value="1858">Canadian Lynx (A54 D84)' 
		+ '<Option value="1864">Perini-R (A49 D84)' 
		+ '<Option value="7034">Blizzard Cannon (A48 D84)' 
		+ '<Option value="2788">Snow Monkey (A62 D83)' 
		+ '<Option value="8181">Getaway Cruiser (A61 D83)' 
		+ '<Option value="2700">Curragh (A60 D83)' 
		+ '<Option value="1314">Opulence (A40 D83)' 
		+ '<Option value="2469">Snowflake (A40 D83)' 
		+ '<Option value="2787">Raccoon (A60 D82)' 
		+ '<Option value="1930">Hammer Hawk (A52 D82)' 
		+ '<Option value="2353">Tax Collector (A52 D82)' 
		+ '<Option value="2451">Miami Vice (A51 D82)' 
		+ '<Option value="2482">Amenhoteps Khopesh (A49 D82)' 
		+ '<Option value="2401">Knuckle Knife (A42 D82)' 
		+ '<Option value="2467">Santa Slay (A42 D82)' 
		+ '<Option value="2203">Red 404 (A41 D82)' 
		+ '<Option value="2416">European Scorpion (A40 D82)' 
		+ '<Option value="1870">Fallen Angel Arm (A40 D82)' 
		+ '<Option value="8081">Tail Gunner (A39 D82)' 
		+ '<Option value="2412">Hellbender (A35 D82)' 
		+ '<Option value="1779">Tlingit Parka (A64 D81)' 
		+ '<Option value="2712">Mud Crawler (A60 D81)' 
		+ '<Option value="2489">Gopher ATV (A59 D81)' 
		+ '<Option value="2446">Falling Leaves (A50 D81)' 
		+ '<Option value="2116">Bollywood Superhit (A47 D81)' 
		+ '<Option value="1863">Perini-R (A46 D81)' 
		+ '<Option value="2471">Focal Distance (A44 D81)' 
		+ '<Option value="5373">Red Devil (A43 D81)' 
		+ '<Option value="2340">Tsunami (A43 D81)' 
		+ '<Option value="2474">Clockwork Beetle (A42 D81)' 
		+ '<Option value="2448">Sonny\'s Suit (A42 D81)' 
		+ '<Option value="1797">Padded Jersey (A40 D81)' 
		+ '<Option value="2441">Christy (A39 D81)' 
		+ '<Option value="2403">Sleeved Armored Vest (A37 D81)' 
		+ '<Option value="871">Toco Toucan (A35 D81)' 
		+ '<Option value="2485">Scythe Chariot (A80 D80)' 
		+ '<Option value="2793">Five Finger Fortification (A65 D80)' 
		+ '<Option value="2805">Day Rider 2K (A60 D80)' 
		+ '<Option value="5389">Pack Hunter (A58 D80)' 
		+ '<Option value="7036">Fearsome Flying Fortress (A47 D80)' 
		+ '<Option value="870">Turnabout (A42 D80)' 
		+ '<Option value="8080">Tail Gunner (A37 D80)' 
		+ '<Option value="1769">Juggernaut (A65 D79)' 
		+ '<Option value="2799">Hack Blade (A60 D79)' 
		+ '<Option value="853">Mobile Garage (A55 D79)' 
		+ '<Option value="7028">Tundra Commmando (A55 D79)' 
		+ '<Option value="1928">Flame-Resistant Suit (A53 D79)' 
		+ '<Option value="2447">Murder of Crows (A49 D79)' 
		+ '<Option value="2706">Idle Hands (A45 D79)' 
		+ '<Option value="8101">Poison Vines (A45 D79)' 
		+ '<Option value="1305">M9 Trebuchet (A40 D79)' 
		+ '<Option value="2438">Sidewinder (A40 D79)' 
		+ '<Option value="1780">Fallen Angel Arm (A37 D79)' 
		+ '<Option value="1867">Cormorant (A35 D79)' 
		+ '<Option value="2351">Carlito\'s Jacket (A33 D79)' 
		+ '<Option value="1772">Pisces Harpoon Gun (A64 D78)' 
		+ '<Option value="5625">Screech Owl (A48 D78)' 
		+ '<Option value="3008">Bad Habit (A46 D78)' 
		+ '<Option value="2704">Slipstream (A44 D78)' 
		+ '<Option value="2444">Autumn Camo (A43 D78)' 
		+ '<Option value="1787">Perini-R (A43 D78)' 
		+ '<Option value="8100">Poison Vines (A42 D78)' 
		+ '<Option value="1704">Grape Vine Bus (A41 D78)' 
		+ '<Option value="8091">Kung-Fu Outfit (A41 D78)' 
		+ '<Option value="4461">Stretch Classic (A31 D78)' 
		+ '<Option value="2791">Desert Eyes (A58 D77)' 
		+ '<Option value="1119">Stout Shoulders (A58 D77)' 
		+ '<Option value="2215">Harpy Eagle (A42 D77)' 
		+ '<Option value="2462">Mirage (A40 D77)' 
		+ '<Option value="1796">Padded Jersey (A37 D77)' 
		+ '<Option value="2346">Hell Sickle (A36 D77)' 
		+ '<Option value="2349">Kleinfeld\'s Boat (A25 D77)' 
		+ '<Option value="2480">Anubian Cultist (A76 D76)' 
		+ '<Option value="5408">Master (A58 D76)' 
		+ '<Option value="2797">Dirty Trick (A57 D76)' 
		+ '<Option value="2785">Coconut Crab (A56 D76)' 
		+ '<Option value="2692">Irish Elk (A54 D76)' 
		+ '<Option value="4457">Carapace Jacket (A48 D76)' 
		+ '<Option value="997">FSB Agent (A42 D76)' 
		+ '<Option value="4462">King Penguin (A42 D76)' 
		+ '<Option value="5615">Swiss Pike (A42 D76)' 
		+ '<Option value="5623">Blackmail Light (A40 D76)' 
		+ '<Option value="2344">Bone Cycle (A39 D76)' 
		+ '<Option value="2158">Her Pretty Head (A38 D76)' 
		+ '<Option value="8090">Kung-Fu Outfit (A38 D76)' 
		+ '<Option value="8079">Tail Gunner (A36 D76)' 
		+ '<Option value="855">ET Hybrid (A63 D75)' 
		+ '<Option value="2790">Power Armor (A55 D75)' 
		+ '<Option value="3005">Brown Cancer Crab (A52 D75)' 
		+ '<Option value="2796">Plasma Rifle (A52 D75)' 
		+ '<Option value="2803">Mugati Sport (A51 D75)' 
		+ '<Option value="11065">Kisser Splitter (A49 D75)' 
		+ '<Option value="2342">Pair of Wired Shades (A42 D75)' 
		+ '<Option value="5308">Steel Apron (A42 D75)' 
		+ '<Option value="2405">Puff Adder (A35 D75)' 
		+ '<Option value="2415">Portable Road Block (A33 D75)' 
		+ '<Option value="1866">Cormorant (A32 D75)' 
		+ '<Option value="2670">Golden Poison Frog (A30 D75)' 
		+ '<Option value="1528">Royal Thai Police Tank (A58 D74)' 
		+ '<Option value="2802">Red Angel (A49 D74)' 
		+ '<Option value="1925">Riding Hat (A48 D74)' 
		+ '<Option value="11058">Smoking Jacket (A48 D74)' 
		+ '<Option value="2309">Jointed Panel (A46 D74)' 
		+ '<Option value="1924">Shiner (A46 D74)' 
		+ '<Option value="4458">Silent Thunder (A46 D74)' 
		+ '<Option value="5622">War Kilt (A46 D74)' 
		+ '<Option value="8099">Poison Vines (A40 D74)' 
		+ '<Option value="4407">Electronic Ear (A39 D74)' 
		+ '<Option value="2458">Sand Goggles (A37 D74)' 
		+ '<Option value="899">Sonar Buoy (A37 D74)' 
		+ '<Option value="8089">Kung-Fu Outfit (A35 D74)' 
		+ '<Option value="2667">Tainted Blades (A35 D74)' 
		+ '<Option value="2361">Iron And Silk (A74 D73)' 
		+ '<Option value="5410">Croc O\'Nine Tails (A52 D73)' 
		+ '<Option value="5382">Gecko (A52 D73)' 
		+ '<Option value="892">Sleeper Shot (A43 D73)' 
		+ '<Option value="7042">Nyathi (A40 D73)' 
		+ '<Option value="773">Boulder Breaker (A37 D73)' 
		+ '<Option value="1784">Padded Jersey (A34 D73)' 
		+ '<Option value="5291">Toaster (A34 D73)' 
		+ '<Option value="1778">Snow Drift (A54 D72)' 
		+ '<Option value="1774">Roadster Rage (A53 D72)' 
		+ '<Option value="1773">Rhinoceros Beetle (A52 D72)' 
		+ '<Option value="1923">Giraffe (A41 D72)' 
		+ '<Option value="7045">Grump Truck (A41 D72)' 
		+ '<Option value="4476">Bisect (A40 D72)' 
		+ '<Option value="1909">Sneak (A38 D72)' 
		+ '<Option value="5370">Steel Plate Greaves (A37 D72)' 
		+ '<Option value="2317">Wake Breaker (A36 D72)' 
		+ '<Option value="2149">Ballistic Helmet (A35 D72)' 
		+ '<Option value="2426">Containment (A35 D72)' 
		+ '<Option value="1719">Don Romo\'s Pride (A35 D72)' 
		+ '<Option value="644">Glance 32 SR (A33 D72)' 
		+ '<Option value="1129">Structural Damage (A32 D72)' 
		+ '<Option value="5313">Bearskin Cloak (A30 D72)' 
		+ '<Option value="5311">Big Horn Sheep (A30 D72)' 
		+ '<Option value="5314">Chisel Plow ATV (A30 D72)' 
		+ '<Option value="5309">Flambe Torch (A30 D72)' 
		+ '<Option value="5310">Giant Octopus (A30 D72)' 
		+ '<Option value="5317">Meat Truck (A30 D72)' 
		+ '<Option value="5312">Venture Axe (A30 D72)' 
		+ '<Option value="1113">Snow Monkey (A52 D71)' 
		+ '<Option value="12000">Brownie (A45 D71)' 
		+ '<Option value="3007">Martian Canal Boat (A43 D71)' 
		+ '<Option value="2662">Pair of Armored Shoulder Pads (A43 D71)' 
		+ '<Option value="5277">Harper 12 (A41 D71)' 
		+ '<Option value="4474">Phantom Body Armor (A38 D71)' 
		+ '<Option value="2436">Cat\'s Eye Hand Axe (A35 D71)' 
		+ '<Option value="645">Hazard Gear (A35 D71)' 
		+ '<Option value="2140">Regalia Foxtrot (A34 D71)' 
		+ '<Option value="2126">Wetland Guide (A34 D71)' 
		+ '<Option value="1134">Autoboatome (A33 D71)' 
		+ '<Option value="1788">Cormorant (A29 D71)' 
		+ '<Option value="2644">Fanteria (A23 D71)' 
		+ '<Option value="874">Field Rider (A21 D71)' 
		+ '<Option value="1765">Force Fire (A52 D70)' 
		+ '<Option value="5387">Pack Hunter (A51 D70)' 
		+ '<Option value="2660">Pitch Car (A50 D70)' 
		+ '<Option value="1981">Belt Buckler (A46 D70)' 
		+ '<Option value="11063">Gate Crasher (A46 D70)' 
		+ '<Option value="4477">White Knuckle Express (A44 D70)' 
		+ '<Option value="903">Field Vest (A42 D70)' 
		+ '<Option value="5286">Steel Plate Jacket (A42 D70)' 
		+ '<Option value="1133">Flood Damage (A40 D70)' 
		+ '<Option value="2338">Eruption (A37 D70)';

// **** NEW YORK ****
	
	var ny_loot = '<option style="color:#33FF00;" value="QueueSet_40">-- NEW YORK LOOT --' 
		+ '<Option value="1">.22 Pistol (A2 D0)' 
		+ '<Option value="112">.22 Pistol +3 (A5 D3)' 
		+ '<Option value="5">.45 Revolver (A3 D2)' 
		+ '<Option value="15">.50 Caliber Rifle (A16 D11)' 
		+ '<Option value="145">\'35 Cabriolet (A10 D20)' 
		+ '<Option value="4">9mm Semi-Automatic (A3 D2)' 
		+ '<Option value="16">Armored Car (A14 D15)' 
		+ '<Option value="11">Armored Truck (A4 D8)' 
		+ '<Option value="9">Automatic Rifle (A4 D4)' 
		+ '<Option value="73">BA-12 Assault Rifle (A32 D10)' 
		+ '<Option value="18">Bodyguard (A8 D25)' 
		+ '<Option value="71">Bookie\'s Holdout Pistol (A24 D12)' 
		+ '<Option value="232">Brickbat (A18 D12)' 
		+ '<Option value="2">Butterfly Knife (A2 D1)' 
		+ '<Option value="7">C4 (A5 D2)' 
		+ '<Option value="67">Chopper (A18 D6)' 
		+ '<Option value="78">Federal Agent (A15 D25)' 
		+ '<Option value="61">Firebomb (A4 D2)' 
		+ '<Option value="70">GX9 (A20 D14)' 
		+ '<Option value="288">Liger (A45 D12)' 
		+ '<Option value="60">Lucky Shamrock Medallion (A1 D7)' 
		+ '<Option value="69">Luxury Yacht (A10 D20)' 
		+ '<Option value="72">Multi-Purpose Truck (A26 D22)' 
		+ '<Option value="20">Napalm Bomb (A25 D9)' 
		+ '<Option value="121">Nunchucks (A22 D18)' 
		+ '<Option value="3">Pair of Brass Knuckles (A2 D2)' 
		+ '<Option value="117">Pint o\' Green Beer (A15 D29)' 
		+ '<Option value="76">Police Cruiser (A22 D28)' 
		+ '<Option value="75">Private Jet (A12 D39)' 
		+ '<Option value="66">Prop plane (A5 D20)' 
		+ '<Option value="34">Revolver (A3 D2)' 
		+ '<Option value="17">RPG Launcher (A20 D12)' 
		+ '<Option value="10">Semi-Automatic Shotgun (A5 D4)' 
		+ '<Option value="74">Set of Falsified Documents (A2 D30)' 
		+ '<Option value="19">Set of Night Vision Goggles (A5 D16)' 
		+ '<Option value="286">Siberian Tiger (A36 D14)' 
		+ '<Option value="8">Stab-Proof Vest (A2 D5)' 
		+ '<Option value="77">Stretch Limo (A16 D37)' 
		+ '<Option value="6">Tactical Shotgun (A3 D2)' 
		+ '<Option value="281">Tora Assault Rifle (A28 D12)';
	
	var chopshop_set = '<option style="color:#33FF00;" value="QueueSet_5">-- CHOP SHOP SET --' 
		+ '<Option value="535">Acetylene Torches' 
		+ '<Option value="534">Car Lift' 
		+ '<Option value="532">Cement Blocks' 
		+ '<Option value="533">Power Tools' 
		+ '<Option value="536">Shipping Containers';
			
	var chopshop_parts = '<option style="color:#33FF00;" value="QueueSet_7">-- CAR BUILDING PARTS --' 
		+ '<Option value="570">Bulletproof Glass' 
		+ '<Option value="558">Car Parts' 
		+ '<Option value="559">Cuban Car Part' 
		+ '<Option value="635">High Tech Car Part' 
		+ '<Option value="560">Russian Car Part' 
		+ '<Option value="571">Solar Panel' 
		+ '<Option value="561">Thai Car Part';

	var weapon_set = '<option style="color:#33FF00;" value="QueueSet_5">-- WEAPONS DEPOT SET --' 
		+ '<Option value="656">Arc Welder' 
		+ '<Option value="657">Buzzsaw' 
		+ '<option value="660">Forge' 
		+ '<Option value="659">Gun Drill' 
		+ '<Option value="658">Gunpowder';
			
	var weapon_parts = '<option style="color:#33FF00;" value="QueueSet_8">-- WEAPON BUILDING PARTS --' 
		+ '<Option value="672">Boomerang' 
		+ '<Option value="669">Explosive Arrow' 
		+ '<Option value="673">Grapple' 
		+ '<Option value="671">Laser Range Finder' 
		+ '<Option value="655">Portable Fusion Reactor' 
		+ '<Option value="654">Railgun Barrel' 
		+ '<Option value="670">Sonic Emitter' 
		+ '<Option value="668">Weapon Part';

	var ny_cons	= '<option style="color:#33FF00;" value="QueueSet_10">-- NEW YORK CONSUMABLES --' 
		+ '<Option value="63">Computer Set-Up (A0 D0)' 
		+ '<Option value="62">Concealable Camera (A0 D0)' 
		+ '<Option value="2183">Furnace (A0 D0)' 
		+ '<Option value="5019">Liquor (A0 D0)' 
		+ '<Option value="65">Set of Blackmail Photos (A0 D0)' 
		+ '<Option value="5021">Set of Cards (A0 D0)' 
		+ '<Option value="68">Set of Illegal Transaction Records (A0 D0)' 
		+ '<Option value="5020">Set of Tokens (A0 D0)' 
		+ '<Option value="64">Untraceable Cell Phone (A0 D0)' 
		+ '<Option value="5022">Wiretap Device (A0 D0)';
	
	var armory_parts = '<Option style="color:#33FF00;" value="QueueSet_5">-- ARMORY BUILD PARTS --' 
		+ '<Option value="2196">Hammer' 
		+ '<Option value="2197">Rivet' 
		+ '<Option value="2183">Furnace' 
		+ '<Option value="2184">Vice' 
		+ '<Option value="2185">Anvil';
		
	var armory_set = '<Option style="color:#33FF00;" value="QueueSet_3">-- ARMORY SET --' 
		+ '<Option value="2195">Armor Part' 
		+ '<Option value="2194">Bio Monitor' 
		+ '<Option value="2193">Micro-Fission Cell';
	
	var zoo_parts = '<Option style="color:#33FF00;" value="QueueSet_5">-- ZOO BUILD PARTS --' 
		+ '<Option value="4605">Aquarium' 
		+ '<Option value="4606">Big Cage' 
		+ '<Option value="4607">Bird Cage' 
		+ '<Option value="4608">Feeding Trough' 
		+ '<Option value="4609">Terrarium';
		
	var animal_parts = '<Option style="color:#33FF00;" value="QueueSet_1">-- ANIMAL BUILD PARTS --' 
		+ '<Option value="4603">Animal Feed';
	
// **** CUBA ****	
	
	var cuba_loot = '<Option style="color:#33FF00;" value="QueueSet_36">-- CUBA LOOT --'
		+ '<Option value="202">Aguila HV .50 Sniper Rifle (A40 D16)' 
		+ '<Option value="183">Armored State Car (A30 D42)' 
		+ '<Option value="201">ASC45 "Conquistador" (A36 D18)' 
		+ '<Option value="191">Avispa Machine Gun (A54 D24)' 
		+ '<Option value="205">Camouflage Body Armor (A18 D34)' 
		+ '<Option value="198">Cane Knife (A18 D28)' 
		+ '<Option value="261">Canonazo (A42 D22)' 
		+ '<Option value="263">Cazador Assault Rifle (A60 D25)' 
		+ '<Option value="192">Che\'s Beret (A46 D34)' 
		+ '<Option value="176">Chucho FAV (A25 D20)' 
		+ '<Option value="179">Cigarette Boat (A25 D27)' 
		+ '<Option value="193">Cocodrilo APC (A42 D56)' 
		+ '<Option value="1321">Cuban Mercenary (A0 D0)' 
		+ '<Option value="189">El Rey Roadster (A40 D34)' 
		+ '<Option value="188">Guardia Presidencial (A42 D32)' 
		+ '<Option value="190">Guerrilla Commando (A38 D35)' 
		+ '<Option value="174">Guerrilla Squad (A34 D30)' 
		+ '<Option value="267">Howler Monkey (A20 D37)' 
		+ '<Option value="182">Hu-9 Helicopter (A36 D27)' 
		+ '<Option value="246">Jaguar (A45 D24)' 
		+ '<Option value="185">Lobo Armored 4x4 (A28 D36)' 
		+ '<Option value="196">M16A1 (A30 D12)' 
		+ '<Option value="175">Mara Serpiente (A24 D18)' 
		+ '<Option value="180">Mini-Sub (A30 D25)' 
		+ '<Option value="178">Montaine 320 (A27 D23)' 
		+ '<Option value="177">Ocelot Armored Truck (A18 D28)' 
		+ '<Option value="251">Panama Hat (A18 D35)' 
		+ '<Option value="199">Para 322 (A34 D14)' 
		+ '<Option value="290">Paratrooper\'s Gear (A36 D15)' 
		+ '<Option value="245">Politico Corrupto (A0 D0)' 
		+ '<Option value="195">RA-92 (A29 D11)' 
		+ '<Option value="187">Set of Pain & Suffering (A48 D16)' 
		+ '<Option value="181">Si-14 Cargo Plane (A31 D31)' 
		+ '<Option value="204">Street Gang Member (A20 D14)' 
		+ '<Option value="186">Tiburon (A38 D30)' 
		+ '<Option value="262">Track Loader (A37 D32)' 
	
	var cuba_cons = '<Option style="color:#33FF00;" value="QueueSet_1">-- CUBA CONSUMABLES --' 
		+ '<Option value="1321">Cuban Mercenary';

// **** MOSCOW ****
	
	var moscow_loot = '<Option style="color:#33FF00;" value="QueueSet_32">-- MOSCOW LOOT --'
		+ '<Option value="1028">Arkticheskij Gus\' (A22 D42)' 
		+ '<Option value="1014">Armored Briefcase (A25 D36)' 
		+ '<Option value="1002">Ballistic Knife (A20 D28)' 
		+ '<Option value="1012">Bank Guard Uniform (A0 D0)' 
		+ '<Option value="1009">Barsuk SUV (A36 D52)' 
		+ '<Option value="1004">Boss Karpov\'s Pistol (A50 D38)' 
		+ '<Option value="1007">Cherepakha Compact (A18 D25)' 
		+ '<Option value="1023">Cossack Armored Vest (A18 D48)' 
		+ '<Option value="1010">Dossier on Dmitri (A0 D0)' 
		+ '<Option value="1031">Drakon (A54 D22)' 
		+ '<Option value="1026">Executive Overcoat (A22 D45)' 
		+ '<Option value="1015">Ex-KGB Bodyguard (A48 D30)' 
		+ '<Option value="1029">Konstantin Cargo Carrier (A18 D44)' 
		+ '<Option value="1000">Molotok Pistol (A22 D26)' 
		+ '<Option value="1018">Officer Corps Paycheck (A0 D0)' 
		+ '<Option value="1021">Orel Armored Helicopter (A24 D40)' 
		+ '<Option value="1027">Osa 17 Snowmobile (A38 D24)' 
		+ '<Option value="1005">PNV (A21 D31)' 
		+ '<Option value="1003">RAS-15 (A30 D18)' 
		+ '<Option value="1022">Razoritel Grenade Launcher (A34 D15)' 
		+ '<Option value="1001">RU-7 .45 Pistol (A25 D23)' 
		+ '<Option value="1019">Ru-78 Heavy Machine Gun (A36 D12)' 
		+ '<Option value="1025">Set of Mansion Details (A0 D0)' 
		+ '<Option value="1011">Set of Photos of Karpov (A0 D0)' 
		+ '<Option value="1008">Severnyy Olen Snowbike (A32 D20)' 
		+ '<Option value="1017">Shchuka Speed Boat (A36 D22)' 
		+ '<Option value="1020">Shturmovik (A45 D28)' 
		+ '<Option value="1013">Taiga Combat Shotgun (A32 D20)' 
		+ '<Option value="1016">Volk Luxury Sedan (A24 D36)' 
		+ '<Option value="1034">Zmeya Carbon Blade (A28 D44)' 
		+ '<Option value="1030">Zoloto Sports Car (A43 D22)' 
		+ '<Option value="1035">ZPR Pulemet (A28 D65)';

	var moscow_cons = '<option style="color:#33FF00;" value="QueueSet_6">-- MOSCOW CONSUMABLES --' 
		+ '<Option value="1012">Bank Guard Uniform' 
		+ '<Option value="1024">Bundle of Dynamite' 
		+ '<Option value="1010">Dossier on Dmitri' 
		+ '<Option value="1025">Mansion Details' 
		+ '<Option value="1018">Officer Corps Paycheck' 
		+ '<Option value="1011">Set of Photos of Karpov';
		
// **** BANGKOK ****
	
	var bangkok_loot = '<option style="color:#33FF00;" value="QueueSet_34">-- BANGKOK LOOT --'
		+ '<Option value="1500">Attack Cobra (A24 D20)' 
		+ '<Option value="1523">Bosozoku Convertible (A29 D15)' 
		+ '<Option value="1550">Chain Viper (A46 D33)' 
		+ '<Option value="1521">Dirt Bike (A24 D14)' 
		+ '<Option value="1535">Drug Shipment (A0 D0)' 
		+ '<Option value="1503">Forest Scorpion (A25 D37)' 
		+ '<Option value="1529">Fugama Kame SUV (A33 D21)' 
		+ '<Option value="1504">Hung Fa RPG (A39 D20)' 
		+ '<Option value="1538">Hyro Glove (A23 D53)' 
		+ '<Option value="1502">Jade Inlaid Pistol (A23 D15)' 
		+ '<Option value="1526">Kage Jet (A27 D42)' 
		+ '<Option value="1501">Komodo Dragon (A34 D22)' 
		+ '<Option value="1548">Lamang Motorcycle (A49 D34)' 
		+ '<Option value="1522">Lloyds Spectre (A18 D45)' 
		+ '<Option value="1524">MalayMobil Helang (A19 D34)' 
		+ '<Option value="1514">Monk\'s Robe (A29 D41)' 
		+ '<Option value="1512">Muai Thai Bodyguard (A18 D25)' 
		+ '<Option value="1545">Ninja (A47 D35)' 
		+ '<Option value="1516">Optical Camo Suit (A43 D26)' 
		+ '<Option value="1536">Pirate (A0 D0)' 
		+ '<Option value="1547">Raed Armored Sedan (A30 D47)' 
		+ '<Option value="1519">Riding Elephant (A18 D30)' 
		+ '<Option value="1515">Royal Thai Army Beret (A28 D21)' 
		+ '<Option value="1520">Royal Thai Army Jeep (A38 D25)' 
		+ '<Option value="1546">Royal Thai Marine (A33 D49)' 
		+ '<Option value="1528">Royal Thai Police Tank (A58 D74)' 
		+ '<Option value="1534">Satellite Phone (A0 D0)' 
		+ '<Option value="1508">Scalding Hot Tea (A26 D35)' 
		+ '<Option value="1525">Seua Daao Sub (A35 D22)' 
		+ '<Option value="1513">Silk Scarf (A20 D22)' 
		+ '<Option value="1537">Thai Baht (A0 D0)' 
		+ '<Option value="1518">Tiger Sak Yant (A65 D42)' 
		+ '<Option value="1543">Titanium Katar (A35 D50)' 
		+ '<Option value="1544">Titanium Mesh Jacket (A31 D46)';
	
	var bangkok_cons = '<option style="color:#33FF00;" value="QueueSet_3">-- BANGKOK CONSUMABLES --' 
		+ '<Option value="1535">Drug Shipment' 
		+ '<Option value="1536">Pirates' 
		+ '<Option value="1534">Satellite Phone'; 
		
// **** LAS VEGAS ****
	
	var vegas_loot = '<option style="color:#33FF00;" value="QueueSet_53">-- VEGAS LOOT --' 
		+ '<Option value="2057">24k Chainsaw (A29 D15)' 
		+ '<Option value="2067">All Terrain (A19 D27)' 
		+ '<Option value="2170">Amphiquad (A58 D24)' 
		+ '<Option value="2159">Arcturion Assault Rifle (A59 D27)' 
		+ '<Option value="2164">Ares Power Armor (A33 D58)' 
		+ '<Option value="2169">Ballista Missile Launcher (A62 D15)' 
		+ '<Option value="2073">Bark Scorpion (A50 D32)' 
		+ '<Option value="2010">Belt Fed Shotgun (A27 D36)' 
		+ '<Option value="2172">Bighorn (A26 D64)' 
		+ '<Option value="2074">Bighorn Ram (A37 D42)' 
		+ '<Option value="2011">Biohazard (A18 D28)' 
		+ '<Option value="2072">Bison (A23 D40)' 
		+ '<Option value="2056">Carver (A24 D16)' 
		+ '<Option value="2021">Classic Convertible (A30 D35)' 
		+ '<Option value="2163">Climbing Gear (A18 D33)' 
		+ '<Option value="2166">Cooling Vest (A31 D61)' 
		+ '<Option value="2076">Diamondback (A56 D48)' 
		+ '<Option value="2022">Dune Buggy (A41 D35)' 
		+ '<Option value="2058">El Escorpion (A40 D30)' 
		+ '<Option value="2063">Femme Fatale (A45 D28)' 
		+ '<Option value="2168">Foo Fighter (A37 D60)' 
		+ '<Option value="2016">Football Jersey (A10 D28)' 
		+ '<Option value="2217">Frilled Lizard (A26 D57)' 
		+ '<Option value="2075">Gila Monster (A36 D48)' 
		+ '<Option value="2060">Gilded RPG (A29 D42)' 
		+ '<Option value="2071">Goldsmobile (A40 D55)' 
		+ '<Option value="2218">Ground Hugger (A55 D30)' 
		+ '<Option value="2069">Hard Four (A30 D50)' 
		+ '<Option value="2025">High Society (A37 D29)' 
		+ '<Option value="2068">Highrise Sport (A29 D38)' 
		+ '<Option value="2165">Hopped-Up Thug (A56 D18)' 
		+ '<Option value="2070">Mojave Mike (A40 D53)' 
		+ '<Option value="2017">Motorcycle Helmet (A22 D32)' 
		+ '<Option value="2019">Moving Truck (A12 D20)' 
		+ '<Option value="2062">Pair of Reinforced Boots (A27 D19)' 
		+ '<Option value="2023">Performance Sports Car (A47 D38)' 
		+ '<Option value="2160">Pitbull Sentry Gun (A28 D52)' 
		+ '<Option value="2065">Police Riot Helmet (A30 D44)' 
		+ '<Option value="2024">Precision SMG (A42 D30)' 
		+ '<Option value="2171">Pronghorn Antelope (A21 D53)' 
		+ '<Option value="2059">Pump Shotgun (A32 D22)' 
		+ '<Option value="2013">Range Finder Rifle (A37 D54)' 
		+ '<Option value="2014">Reinforced Tuxedo (A28 D34)' 
		+ '<Option value="2066">Reinhardt and Otto (A57 D36)' 
		+ '<Option value="2061">Rhinestone Cowboy (A33 D25)' 
		+ '<Option value="2161">Ripper Assault Rifle (A57 D30)' 
		+ '<Option value="2026">Road Tractor (A25 D33)' 
		+ '<Option value="2020">Sand Storm (A29 D15)' 
		+ '<Option value="2015">Set of Biker Leathers (A30 D48)' 
		+ '<Option value="2018">Stake Bed Truck (A20 D38)' 
		+ '<Option value="2012">Two Pair (A31 D44)' 
		+ '<Option value="2064">Ventilated Blast Cap (A32 D24)' 
		+ '<Option value="2167">X-22 Peregrine (A53 D34)';
	
	var vegas_parts = '<Option style="color:#33FF00;" value="QueueSet_9">-- VEGAS PROPERTY PARTS --' 
		+ '<Option value="1582">Bellhop' 
		+ '<Option value="1579">Casino Dealer' 
		+ '<Option value="1580">Chef' 
		+ '<Option value="1575">Cinder Block' 
		+ '<Option value="1577">Concrete' 
		+ '<Option value="1578">Construction Tool' 
		+ '<Option value="1581">Poker Table' 
		+ '<Option value="1574">Slot Machine' 
		+ '<Option value="1576">Steel Girder';
			
	var vegas_cons = '<Option style="color:#33FF00;" value="QueueSet_3">-- VEGAS CONSUMABLES --' 
		+ '<Option value="2027">Alarm Code' 
		+ '<Option value="2030">Hot Tip' 
		+ '<Option value="2029">Hotel Security Key Card';
			
	var vegas_set = '<Option style="color:#33FF00;" value="QueueSet_5">-- VEGAS CASINO SET --' 
		+ '<Option value="762">Security Camera' 
		+ '<Option value="763">Reinforced Steel' 
		+ '<Option value="764">Deposit Box' 
		+ '<Option value="765">Motion Sensor' 
		+ '<Option value="766">Magnetic Lock';
		
// **** ITALY ****
	
	var italy_loot = '<Option style="color:#33FF00;" value="QueueSet_52">-- ITALY LOOT --' 
		+ '<Option value="5324">Angelo Della Morte (A35 D56)' 
		+ '<Option value="2642">Antiproiettil (A66 D52)' 
		+ '<Option value="1041">Arma Di Ordinanza (A21 D32)' 
		+ '<Option value="5344">Armatura Motocicletta (A40 D66)' 
		+ '<Option value="5345">Armatura Ramarro (A65 D45)' 
		+ '<Option value="5325">Arrivederci 20 (A55 D41)' 
		+ '<Option value="5326">Asconini 33 (A38 D61)' 
		+ '<Option value="1062">Asino (A27 D38)' 
		+ '<Option value="1059">Avanti Tutta (A44 D56)' 
		+ '<Option value="2643">Bolla (A68 D55)' 
		+ '<Option value="1056">Cavalletta (A43 D26)' 
		+ '<Option value="1068">Cinghiale (A45 D50)' 
		+ '<Option value="2639">Coccodrillo (A57 D40)' 
		+ '<Option value="1053">Corpo Armatura (A63 D31)' 
		+ '<Option value="1046">Diavolo Piccolo SMG (A56 D28)' 
		+ '<Option value="1042">Doppietta (A39 D30)' 
		+ '<Option value="1066">Eagle Owl (A32 D46)' 
		+ '<Option value="1049">Elmo Della Grande Guerra (A19 D39)' 
		+ '<Option value="1060">Fenzi Tuorno (A52 D25)' 
		+ '<Option value="1063">Gallo (A20 D37)' 
		+ '<Option value="5329">Giove Velocita (A65 D52)' 
		+ '<Option value="1064">Goshawk (A47 D15)' 
		+ '<Option value="5335">Holy Hand Grenade (A71 D57)' 
		+ '<Option value="5330">Italian Porcupine (A56 D66)' 
		+ '<Option value="1061">Italian Wolf (A43 D33)' 
		+ '<Option value="1058">Luxury Sailboat (A27 D51)' 
		+ '<Option value="1052">Maglietta (A33 D45)' 
		+ '<Option value="1065">Man-of-War (A12 D43)' 
		+ '<Option value="5348">Marco Marino AF (A68 D47)' 
		+ '<Option value="1067">Marsican Brown Bear (A48 D27)' 
		+ '<Option value="1069">Meadow Viper (A62 D37)' 
		+ '<Option value="1045">Milano Foil (A31 D50)' 
		+ '<Option value="1051">Neoprene Vest (A46 D28)' 
		+ '<Option value="2636">Officer\'s Jacket (A48 D40)' 
		+ '<Option value="5336">Pontiff-1 (A66 D49)' 
		+ '<Option value="5337">Popemobile (A30 D62)' 
		+ '<Option value="1054">Pulcinella (A45 D56)' 
		+ '<Option value="1043">Rapier (A41 D35)' 
		+ '<Option value="5333">Rex Enterra (A43 D54)' 
		+ '<Option value="5349">Roman Legion (A74 D58)' 
		+ '<Option value="1048">Scutum (A21 D38)' 
		+ '<Option value="5350">Sea Eagle (A74 D55)' 
		+ '<Option value="5351">Spaghetti Western (A39 D65)' 
		+ '<Option value="5339">Swiss Guard (A59 D69)' 
		+ '<Option value="5340">Templar Hammer (A42 D61)' 
		+ '<Option value="5341">Templar Shield (A62 D42)' 
		+ '<Option value="1050">Teppista (A47 D29)' 
		+ '<Option value="1047">Tirapugni (A38 D51)' 
		+ '<Option value="1055">Tradire (A32 D28)' 
		+ '<Option value="1040">Vachelli CP (A42 D18)' 
		+ '<Option value="1044">Venetian Blinder (A30 D52)' 
		+ '<Option value="1057">Water Taxi (A19 D42)';
		
		
// **** BRAZIL ****
	
	var brazil_loot = '<option style="color:#33FF00;" value="QueueSet_15">-- BRAZIL LOOT --'
		+ '<Option value="5502">Amazon River Guide (A30 D16)' 
		+ '<Option value="8027">Army Cargo Carrier (A83 D57)' 
		+ '<Option value="5505">Banana Slugger (A19 D37)' 
		+ '<Option value="5501">Big Bounty (A37 D20)' 
		+ '<Option value="5511">Caracara (A22 D44)' 
		+ '<Option value="5507">Cat\'s Claw (A35 D20)' 
		+ '<Option value="5504">Chomper (A39 D19)' 
		+ '<Option value="8028">Ebon Severer (A56 D84)' 
		+ '<Option value="5506">Fer De Lance (A33 D18)' 
		+ '<Option value="5509">Jiu Jitsu Gi (A49 D27)' 
		+ '<Option value="5682">Jungle Hacker (A57 D85)' 
		+ '<Option value="5503">Rio Police Uniform (A20 D35)' 
		+ '<Option value="5701">Smuggler\'s Sub (A86 D58)' 
		+ '<Option value="5508">Survival Light (A20 D37)' 
		+ '<Option value="5510">Ultralight (A21 D42)'; 
		
		
// **** CHICAGO ****
	
	var chicago_loot = '<option style="color:#33FF00;" value="QueueSet_10">-- CHICAGO LOOT --' 
		+ '<Option value="11062">Boby Grand (A80 D50)' 
		+ '<Option value="11061">Dapper Flapper (A96 D63)' 
		+ '<Option value="11063">Gate Crasher (A46 D70)' 
		+ '<Option value="11065">Kisser Splitter (A49 D75)' 
		+ '<Option value="11059">Savage Suspenders (A69 D46)' 
		+ '<Option value="11064">Schooner (A55 D88)' 
		+ '<Option value="11056>Sinker (A83 D54)' 
		+ '<Option value="11060">Smoke Eater (A86 D56)' 
		+ '<Option value="11058">Smoking Jacket (A48 D74)' 
		+ '<Option value="11057">Sugar Daddy (A91 D61)';
			
	var chicago_parts = '<Option style="color:#33FF00;" value="QueueSet_5">-- CHICAGO PARTS --' 
		+ '<Option value="11052">Carpenter Nails' 
		+ '<Option value="11055">Douglas Fir Beams' 
		+ '<Option value="11054">Iron Cast' 
		+ '<Option value="11053">Lath Strips' 
		+ '<Option value="11051">Union Worker';
		
// **** LONDON LOOT ****
	var london_parts = '<Option style="color:#33FF00;" value="QueueSet_11">-- LONDON PARTS --' 
		+ '<Option value="12218">English Brick' 
		+ '<Option value="12219">Clay Tiles' 
		+ '<Option value="12220">Sledge Hammer' 
		+ '<Option value="12221">Plumb Line' 
		+ '<Option value="12222">Iron Girder';
/*		
		+ '<Option value="18087">Russian Passport' 
		+ '<Option value="18088">Kit Bag' 
		+ '<Option value="18089">Power Ups' 
		+ '<Option value="18090">Piggy Bank' 
		+ '<Option value="18091">Microchip' 
		+ '<Option value="18092">Official Documents';
*/	

// **** SPECIAL EVENT ****

	var specialevent_loot = '<Option style="color:#33FF00;" value="QueueSet_481">-- SPECIAL EVENT LOOT --' 
		+ '<Option value="132">.45 ACP Pistol (A18 D12)' 
		+ '<Option value="110">.45 Cal Pistol +1 (A3 D3)' 
		+ '<Option value="169">10 Gallon Hat (A13 D27)' 
		+ '<Option value="719">22LR (A46 D28)' 
		+ '<Option value="1900">40 Caliber Defender (A43 D25)' 
		+ '<Option value="576">Ace in the Sleeve (A53 D23)' 
		+ '<Option value="779">African Elephant (A61 D37)' 
		+ '<Option value="386">Agent Purvis\' Rifle (A44 D29)' 
		+ '<Option value="456">Alley Apple (A21 D15)' 
		+ '<Option value="905">Alpine (A35 D57)' 
		+ '<Option value="1783">Aluminum Bat (A67 D26)' 
		+ '<Option value="852">Amplitude (A65 D39)' 
		+ '<Option value="2435">Antidote (A65 D34)' 
		+ '<Option value="5365">Apprentice (A29 D47)' 
		+ '<Option value="2105">Arm Guard (A27 D48)' 
		+ '<Option value="544">Armed Doorman (A51 D24)' 
		+ '<Option value="2103">Armor Piercing K-28 (A26 D54)' 
		+ '<Option value="3523">Art Gamer (A0 D0)' 
		+ '<Option value="2455">Ascension (A29 D57)' 
		+ '<Option value="2437">Astro Cruise (A77 D38)' 
		+ '<Option value="1540">Auto Caliber (A52 D21)' 
		+ '<Option value="676">Backdoor (A21 D53)' 
		+ '<Option value="426">Bag of Economy Pack of Socks (A10 D20)' 
		+ '<Option value="211">Bandanna (A11 D19)' 
		+ '<Option value="890">Barracuda (A31 D59)' 
		+ '<Option value="513">Be Mine (A20 D14)' 
		+ '<Option value="5313">Bearskin Cloak (A30 D72)' 
		+ '<Option value="1855">Bench Rifle (A52 D30)' 
		+ '<Option value="2350">Benny Blanco (A78 D50)' 
		+ '<Option value="675">Big Bad Wolf (A42 D25)' 
		+ '<Option value="760">Big Blind (A52 D25)' 
		+ '<Option value="5311">Big Horn Sheep (A30 D72)' 
		+ '<Option value="249">Bigg\'s Rig (A13 D18)' 
		+ '<Option value="4476">Bisect (A40 D72)' 
		+ '<Option value="4413">Black Backed Jackal (A76 D42)' 
		+ '<Option value="2409">Black Bear (A75 D34)' 
		+ '<Option value="4454">Blue Dragon Helm (A75 D52)' 
		+ '<Option value="3522">Blue Eyed Nate (A0 D0)' 
		+ '<Option value="4403">Blue Sky 55 (A25 D50)' 
		+ '<Option value="424">Bobble Head (A13 D23)' 
		+ '<Option value="4596">Bobcat (A42 D49)' 
		+ '<Option value="1700">Bolo Knife (A65 D27)' 
		+ '<Option value="2209">Bone Carved Pistol (A49 D26)' 
		+ '<Option value="2501">Bowie Knife (A31 D58)' 
		+ '<Option value="1903">Box Jellyfish (A28 D56)' 
		+ '<Option value="1756">Brawler\'s Headguard (A35 D65)' 
		+ '<Option value="5369">Brown Rat (A68 D45)' 
		+ '<Option value="12000">Brownie (A45 D71)' 
		+ '<Option value="1944">Bullet Proof Heart (A42 D67)' 
		+ '<Option value="314">CA-10 TMP (A18 D24)' 
		+ '<Option value="5368">California Moray (A42 D65)' 
		+ '<Option value="4457">Carapace Jacket (A48 D76)' 
		+ '<Option value="342">Cargo Ship (A15 D46)' 
		+ '<Option value="2351">Carlito\'s Jacket (A33 D79)' 
		+ '<Option value="2348">Carlito\'s Way (A76 D44)' 
		+ '<Option value="303">Carnivore Urban Shotgun (A25 D14)' 
		+ '<Option value="758">Casino Guard (A48 D28)' 
		+ '<Option value="2436">Cat\'s Eye Hand Axe (A35 D71)' 
		+ '<Option value="7058">Chance (A85 D62)' 
		+ '<Option value="415">Cherry Picker (A36 D13)' 
		+ '<Option value="5314">Chisel Plow ATV (A30 D72)' 
		+ '<Option value="12001">Christmas Cupcakes (A71 D45)' 
		+ '<Option value="1725">Chudnovsky\'s Gas Mask (A20 D32)' 
		+ '<Option value="2102">Clipper (A45 D24)' 
		+ '<Option value="2429">Cocoon Riot Shield (A50 D26)' 
		+ '<Option value="5399">Cold Snap (A43 D31)' 
		+ '<Option value="218">Colombian Necktie (A8 D22)' 
		+ '<Option value="964">Combat Chopper (A44 D36)' 
		+ '<Option value="718">Combat Helmet (A22 D46)' 
		+ '<Option value="869">Compression (A80 D37)' 
		+ '<Option value="356">Cooked Goose (A15 D27)' 
		+ '<Option value="4463">Copperhead (A75 D49)' 
		+ '<Option value="453">Corkscrew (A33 D22)' 
		+ '<Option value="1788">Cormorant (A29 D71)' 
		+ '<Option value="1866">Cormorant (A32 D75)' 
		+ '<Option value="1867">Cormorant (A35 D79)' 
		+ '<Option value="5612">Crab Shell Vest (A67 D48)' 
		+ '<Option value="5410">Croc O\'Nine Tails (A52 D73)' 
		+ '<Option value="516">Cupid (A46 D27)' 
		+ '<Option value="508">Cupid\'s Arrow (A37 D27)' 
		+ '<Option value="88">Cupid\'s Tommy Gun (A24 D22)' 
		+ '<Option value="2700">Curragh (A60 D83)' 
		+ '<Option value="618">Dead Ringer (A45 D36)' 
		+ '<Option value="484">Deadly Armed Guard (A12 D28)' 
		+ '<Option value="483">Deadly Body Double (A25 D45)' 
		+ '<Option value="470">Deadly Boomslang ACR (A45 D20)' 
		+ '<Option value="488">Deadly Bullet-Proof Berkshire (A20 D36)' 
		+ '<Option value="477">Deadly Cattle Prod (A14 D26)' 
		+ '<Option value="489">Deadly Chrome Skyline (A35 D22)' 
		+ '<Option value="481">Deadly Combat Knife (A27 D21)' 
		+ '<Option value="474">Deadly COP357 (A47 D25)' 
		+ '<Option value="487">Deadly Dragon Skin Body Armor (A19 D36)' 
		+ '<Option value="485">Deadly Gas Mask (A16 D26)' 
		+ '<Option value="492">Deadly Giavellotto (A30 D33)' 
		+ '<Option value="469">Deadly Gold Crowbar (A27 D23)' 
		+ '<Option value="490">Deadly Gold GX9 (A46 D30)' 
		+ '<Option value="491">Deadly Impression (A28 D47)' 
		+ '<Option value="482">Deadly Jetpack Prototype (A46 D15)' 
		+ '<Option value="472">Deadly Light Anti Tank Weapon (A33 D22)' 
		+ '<Option value="479">Deadly M32 Grenade Launcher (A44 D20)' 
		+ '<Option value="476">Deadly M468 Assault Rifle (A36 D20)' 
		+ '<Option value="480">Deadly Meat Hook (A28 D23)' 
		+ '<Option value="475">Deadly Piano Wire (A32 D16)' 
		+ '<Option value="486">Deadly Riot Gear (A20 D35)' 
		+ '<Option value="493">Deadly SWAT Van (A18 D28)' 
		+ '<Option value="711">Death Dealer Minigun (A48 D64)' 
		+ '<Option value="421">Decorated Tree (A4 D26)' 
		+ '<Option value="395">Dentist\'s Drill (A21 D11)' 
		+ '<Option value="2430">Desert Haze (A28 D52)' 
		+ '<Option value="2646">Devil Costume (A55 D27)' 
		+ '<Option value="392">Dillinger\'s Overcoat (A22 D40)' 
		+ '<Option value="385">Dillinger\'s Pistols and Holster (A36 D18)' 
		+ '<Option value="258">Dirty Syringe (A23 D5)' 
		+ '<Option value="1719">Don Romo\'s Pride (A35 D72)' 
		+ '<Option value="4459">Double-Reign Bow (A76 D39)' 
		+ '<Option value="444">Drago (A15 D25)' 
		+ '<Option value="2497">Dragon\'s Head (A67 D36)' 
		+ '<Option value="615">Dublin Stallion (A26 D51)' 
		+ '<Option value="973">Eagle Eye (A22 D49)' 
		+ '<Option value="140">Easter Egg Bomb (A28 D13)' 
		+ '<Option value="626">Easter Metsubushi (A26 D48)' 
		+ '<Option value="627">Egg Crate Vest (A16 D23)' 
		+ '<Option value="5372">Eku Oar Staff (A77 D48)' 
		+ '<Option value="4407">Electronic Ear (A39 D74)' 
		+ '<Option value="4479">Emperor Scorpion (A45 D68)' 
		+ '<Option value="855">ET Hybrid (A63 D75)' 
		+ '<Option value="2416">European Scorpion (A40 D82)' 
		+ '<Option value="2498">Everglade Rat Snake (A60 D32)' 
		+ '<Option value="5385">Eviscerator Boots (A76 D53)' 
		+ '<Option value="1301">Executor Pistol (A58 D29)' 
		+ '<Option value="5611">Feathered Cloak (A45 D64)' 
		+ '<Option value="4593">Fennec Fox (A25 D36)' 
		+ '<Option value="769">Field Rifle (A28 D39)' 
		+ '<Option value="2306">Fish Spear (A72 D45)' 
		+ '<Option value="2129">Flack Dagger (A52 D26)' 
		+ '<Option value="5309">Flambe Torch (A30 D72)' 
		+ '<Option value="1781">Flanger (A80 D45)' 
		+ '<Option value="1872">Flanger (A83 D48)' 
		+ '<Option value="2402">Flicker (A82 D43)' 
		+ '<Option value="2433">FNC Urban Transporter (A58 D26)' 
		+ '<Option value="2454">Folding Machine Gun (A54 D27)' 
		+ '<Option value="361">Food Coma (A20 D42)' 
		+ '<Option value="2434">Fox Hole (A32 D61)' 
		+ '<Option value="599">Fox Hunter Rocket Launcher (A48 D27)' 
		+ '<Option value="5412">Foxer (A70 D55)' 
		+ '<Option value="2099">Frontier Chainsaw (A56 D38)' 
		+ '<Option value="1539">Frost Gear (A25 D49)' 
		+ '<Option value="422">Fruitcake (A13 D15)' 
		+ '<Option value="1902">Fugama Kameo (A46 D19)' 
		+ '<Option value="390">Fur Coat (A12 D28)' 
		+ '<Option value="2696">Gaelic Crossbow (A79 D55)' 
		+ '<Option value="5400">Game Face (A31 D43)' 
		+ '<Option value="2303">Garrotte (A73 D44)' 
		+ '<Option value="1726">Gas Gun (A16 D32)' 
		+ '<Option value="56">Gas Mask (A8 D20)' 
		+ '<Option value="2413">Gear Belt (A75 D29)' 
		+ '<Option value="5382">Gecko (A52 D73)' 
		+ '<Option value="417">Getaway Car Ornament (A6 D23)' 
		+ '<Option value="8181">Getaway Cruiser (A61 D83)' 
		+ '<Option value="2647">Ghost Costume (A32 D56)' 
		+ '<Option value="5310">Giant Octopus (A30 D72)' 
		+ '<Option value="740">Global Cup (A47 D29)' 
		+ '<Option value="1854">Global Cup Ball (A36 D15)' 
		+ '<Option value="114">Gold .50 Cal Pistol (A25 D15)' 
		+ '<Option value="628">Golden Ticket (A25 D13)' 
		+ '<Option value="280">Golf Cart (A15 D20)' 
		+ '<Option value="134">Grach (A20 D10)' 
		+ '<Option value="1704">Grape Vine Bus (A41 D78)' 
		+ '<Option value="5614">Gray Tail Rifle (A73 D40)' 
		+ '<Option value="731">Great Gray Owl (A37 D56)' 
		+ '<Option value="1940">Green Machine (A45 D21)' 
		+ '<Option value="418">Grenade Ornament (A19 D10)' 
		+ '<Option value="4480">Grizzly Man-Eater (A73 D33)' 
		+ '<Option value="1716">Guard Vest (A17 D32)' 
		+ '<Option value="317">Guerilla Bodyguard (A25 D44)' 
		+ '<Option value="7052">Gungnir (A82 D60)' 
		+ '<Option value="1914">H68 SMG-2 (A56 D27)' 
		+ '<Option value="329">Halloween Candy Truck (A20 D35)' 
		+ '<Option value="577">Hammer 760-EK (A53 D21)' 
		+ '<Option value="851">Hard as Nails (A38 D66)' 
		+ '<Option value="5277">Harper 12 (A41 D71)' 
		+ '<Option value="160">Harpoon Gun (A19 D13)' 
		+ '<Option value="2215">Harpy Eagle (A42 D77)' 
		+ '<Option value="645">Hazard Gear (A35 D71)' 
		+ '<Option value="243">Hearse (A10 D20)' 
		+ '<Option value="5405">Heavy Assault Squad (A31 D58)' 
		+ '<Option value="624">Heavy Hand (A43 D23)' 
		+ '<Option value="2412">Hellbender (A35 D82)' 
		+ '<Option value="510">Hidden Sentry (A9 D22)' 
		+ '<Option value="754">High Roller (A46 D23)' 
		+ '<Option value="512">Highball (A36 D24)' 
		+ '<Option value="420">Holiday Star (A15 D20)' 
		+ '<Option value="1715">Home Cooked Meal (A18 D68)' 
		+ '<Option value="2499">Hornet Goggles (A25 D47)' 
		+ '<Option value="610">Horse Training Whip (A24 D13)' 
		+ '<Option value="1908">HyroTM Torso Guard (A70 D31)' 
		+ '<Option value="156">I <3 Mom Tattoo (A15 D22)' 
		+ '<Option value="347">Idaho Special (A22 D15)' 
		+ '<Option value="7021">I\'ll Be Back (A43 D36)' 
		+ '<Option value="2212">Immelman (A51 D27)' 
		+ '<Option value="2210">Indian Katar (A33 D62)' 
		+ '<Option value="171">Indy Racer (A16 D22)' 
		+ '<Option value="741">Injury Time (A38 D52)' 
		+ '<Option value="2692">Irish Elk (A54 D76)' 
		+ '<Option value="616">Irish Wolfhound (A48 D29)' 
		+ '<Option value="2361">Iron And Silk (A74 D73)' 
		+ '<Option value="524">Ironside Tactical Vest (A27 D49)' 
		+ '<Option value="1786">Italian Housekeeper (A76 D35)' 
		+ '<Option value="1861">Italian Housekeeper (A80 D38)' 
		+ '<Option value="1862">Italian Housekeeper (A83 D40)' 
		+ '<Option value="1703">Jackal (A25 D65)' 
		+ '<Option value="247">Jackhammer (A15 D15)' 
		+ '<Option value="761">Jackpot (A30 D54)' 
		+ '<Option value="770">Jimmy\'s 220 Sunset (A48 D23)' 
		+ '<Option value="2309">Jointed Panel (A46 D74)' 
		+ '<Option value="735">Joy Buzzer (A15 D21)' 
		+ '<Option value="7022">Jungle Strike (A36 D43)' 
		+ '<Option value="4410">KAO Rockstar (A75 D41)' 
		+ '<Option value="2410">Killing Time (A81 D37)' 
		+ '<Option value="4462">King Penguin (A42 D76)' 
		+ '<Option value="2500">Kitchen Knife (A57 D27)' 
		+ '<Option value="4402">Knockout (A51 D23)' 
		+ '<Option value="2401">Knuckle Knife (A42 D82)' 
		+ '<Option value="345">Knuckle Shotty (A18 D25)' 
		+ '<Option value="412">Knuckle Trimmer (A31 D23)' 
		+ '<Option value="597">Koenigsberg S10 (A30 D46)' 
		+ '<Option value="1757">Lady Luck\'s Tessan (A70 D38)' 
		+ '<Option value="325">Laser Squirrel (A43 D12)' 
		+ '<Option value="5367">Lemon Drop (A61 D25)' 
		+ '<Option value="331">Lobotomizer (A39 D14)' 
		+ '<Option value="387">Locket of Billie (A10 D36)' 
		+ '<Option value="713">Lone Wolf (A44 D30)' 
		+ '<Option value="526">Lonely Heart (A48 D20)' 
		+ '<Option value="239">Lorica (A18 D32)' 
		+ '<Option value="184">Lou\'s Midnight Special (A36 D14)' 
		+ '<Option value="1943">Lovebird (A52 D36)' 
		+ '<Option value="2431">Lucky Number Seven (A55 D27)' 
		+ '<Option value="847">Lump of Coal (A1 D1)' 
		+ '<Option value="3521">Mad Gifter (A0 D0)' 
		+ '<Option value="2213">Magma Magnifique (A31 D63)' 
		+ '<Option value="442">Manhattan Ball Drop (A19 D30)' 
		+ '<Option value="344">Manhunter Shotgun (A40 D24)' 
		+ '<Option value="2214">Markhor (A75 D37)' 
		+ '<Option value="5364">Master (A48 D60)' 
		+ '<Option value="5408">Master (A58 D76)' 
		+ '<Option value="59">Meat Cleaver (A22 D21)' 
		+ '<Option value="1834">Meat Tenderizer (A25 D56)' 
		+ '<Option value="5317">Meat Truck (A30 D72)' 
		+ '<Option value="256">Meatgrinder (A37 D14)' 
		+ '<Option value="557">Mesh Alloy (A23 D47)' 
		+ '<Option value="153">Mesh Trucker Hat (A10 D20)' 
		+ '<Option value="1850">Mexican Ball (A16 D36)' 
		+ '<Option value="128">Midas\' Butterfly Knife (A26 D20)' 
		+ '<Option value="598">Military Spy Drone (A33 D47)' 
		+ '<Option value="853">Mobile Garage (A55 D79)' 
		+ '<Option value="323">Monkey Brain Stew (A2 D27)' 
		+ '<Option value="2128">Morning Star (A28 D51)' 
		+ '<Option value="543">Motorcycle Jacket (A25 D50)' 
		+ '<Option value="5411">Mugger Crocodile (A46 D85)' 
		+ '<Option value="463">Mustard Gas (A43 D17)' 
		+ '<Option value="4478">N7 Tomahawk (A71 D28)' 
		+ '<Option value="272">Ness\' Fedora (A28 D22)' 
		+ '<Option value="1856">Netherlands Ball (A18 D35)' 
		+ '<Option value="5619">North American Porcupine (A51 D85)' 
		+ '<Option value="5618">Northern Pike (A83 D56)' 
		+ '<Option value="974">Notch .40 Cal (A51 D28)' 
		+ '<Option value="419">Nutcracker (A25 D12)' 
		+ '<Option value="2108">Offroad (A51 D23)' 
		+ '<Option value="771">One-Armed Bandit (A28 D50)' 
		+ '<Option value="944">Outlander (A62 D40)' 
		+ '<Option value="5387">Pack Hunter (A51 D70)' 
		+ '<Option value="5389">Pack Hunter (A58 D80)' 
		+ '<Option value="767">Padded Heavy Jacket (A28 D24)' 
		+ '<Option value="1784">Padded Jersey (A34 D73)' 
		+ '<Option value="1901">Padded Suit (A26 D45)' 
		+ '<Option value="468">Pair of Deadly Silver Knuckles (A22 D28)' 
		+ '<Option value="388">Pair of Dillinger\'s Sunglasses (A23 D34)' 
		+ '<Option value="975">Pair of HyroTM Ultra Light Boots (A26 D54)' 
		+ '<Option value="2107">Pair of Joint Protectors (A34 D67)' 
		+ '<Option value="2404">Pair of Security Gloves (A82 D38)' 
		+ '<Option value="113">Pair of Silver Knuckles (A25 D24)' 
		+ '<Option value="849">Pair of Skywalkers (A28 D61)' 
		+ '<Option value="550">Pair of Steeltips (A20 D26)' 
		+ '<Option value="609">Pair of Vintage Binoculars (A14 D23)' 
		+ '<Option value="2106">Pair of Weighted Gloves (A57 D29)' 
		+ '<Option value="514">Pair of Wilted Roses (A13 D16)' 
		+ '<Option value="5366">Palm Protectors (A60 D35)' 
		+ '<Option value="2648">Pantomime Horse (A57 D31)' 
		+ '<Option value="238">Parma (A15 D25)' 
		+ '<Option value="443">Party Balloons (A6 D18)' 
		+ '<Option value="5406">Pecuna Blowgun (A45 D24)' 
		+ '<Option value="714">Pepper Shaker (A31 D45)' 
		+ '<Option value="1787">Perini-R (A43 D78)' 
		+ '<Option value="1863">Perini-R (A46 D81)' 
		+ '<Option value="1864">Perini-R (A49 D84)' 
		+ '<Option value="2109">Pesaro Racer (A28 D61)' 
		+ '<Option value="4474">Phantom Body Armor (A38 D71)' 
		+ '<Option value="4595">Philippine Eagle (A48 D31)' 
		+ '<Option value="131">Phone Bomb (A27 D18)' 
		+ '<Option value="22">Piano Wire (A10 D5)' 
		+ '<Option value="5404">Pink Birdeater Tarantula (A65 D34)' 
		+ '<Option value="778">Plains Zebra (A28 D60)' 
		+ '<Option value="2132">PlastiPlate Jacket (A29 D59)' 
		+ '<Option value="5371">Plated Mini-Dress (A75 D41)' 
		+ '<Option value="2411">Plum Putter (A82 D42)' 
		+ '<Option value="1907">Poison Dart Frog (A28 D68)' 
		+ '<Option value="100">Poison Gas Grenade (A22 D26)' 
		+ '<Option value="81">Police Baton (A23 D22)' 
		+ '<Option value="5320">Portable Defibrillator (A51 D37)' 
		+ '<Option value="2415">Portable Road Block (A33 D75)' 
		+ '<Option value="382">Power Plough (A20 D16)' 
		+ '<Option value="868">Prism Armored Vest (A79 D41)' 
		+ '<Option value="1718">Prized Pet (A50 D26)' 
		+ '<Option value="1749">Prop 4 (A65 D55)' 
		+ '<Option value="44">Propane Bomb (A22 D21)' 
		+ '<Option value="284">Pro\'s 2 Iron (A24 D19)' 
		+ '<Option value="1701">Protective Shirt (A27 D64)' 
		+ '<Option value="389">Public Enemy #1 Newspaper (A6 D30)' 
		+ '<Option value="2405">Puff Adder (A35 D75)' 
		+ '<Option value="220">Punch Knife (A21 D11)' 
		+ '<Option value="511">Purple Gang\'s Gun (A19 D30)' 
		+ '<Option value="5409">Quilled Wristguard (A71 D49)' 
		+ '<Option value="2206">Rain Slick (A28 D48)' 
		+ '<Option value="2406">Rappelling Gear (A76 D36)' 
		+ '<Option value="1498">Rat Pack (A29 D60)' 
		+ '<Option value="5292">Razorback (A76 D38)' 
		+ '<Option value="413">Red Boa (A19 D38)' 
		+ '<Option value="737">Red Card (A35 D30)' 
		+ '<Option value="228">Red Coat (A8 D38)' 
		+ '<Option value="5373">Red Devil (A43 D81)' 
		+ '<Option value="848">Red Fox (A62 D26)' 
		+ '<Option value="4613">Red Kangaroo (A30 D53)' 
		+ '<Option value="4475">Red XIV (A69 D51)' 
		+ '<Option value="704">Reef Shark (A55 D24)' 
		+ '<Option value="2208">Reinforced Leather (A36 D67)' 
		+ '<Option value="2457">Remorra Gray (A62 D34)' 
		+ '<Option value="2211">Rex Fang (A73 D35)' 
		+ '<Option value="970">Ring Gun (A46 D31)' 
		+ '<Option value="315">Riot Shield (A14 D26)' 
		+ '<Option value="4460">Road Razor (A77 D35)' 
		+ '<Option value="2456">Rock Python (A58 D31)' 
		+ '<Option value="756">Royal Flush (A48 D25)' 
		+ '<Option value="457">Royal White Elephant (A34 D48)' 
		+ '<Option value="292">Russian Bear (A22 D45)' 
		+ '<Option value="227">Saber (A17 D13)' 
		+ '<Option value="122">Samurai Helmet (A12 D28)' 
		+ '<Option value="2452">Scissor Sister (A25 D51)' 
		+ '<Option value="509">Senza Pari (A21 D12)' 
		+ '<Option value="147">Sergeant Murphy\'s Cosh (A15 D15)' 
		+ '<Option value="933">Set of Ballistic Blades (A40 D68)' 
		+ '<Option value="230">Set of Fireworks (A24 D6)' 
		+ '<Option value="529">Set of High Powered Binoculars (A15 D21)' 
		+ '<Option value="623">Set of Pocket Rockets (A51 D30)' 
		+ '<Option value="384">Set of Prison Stripes (A15 D24)' 
		+ '<Option value="538">Set of Twin AK-47s (A52 D26)' 
		+ '<Option value="539">Set of Twin Automatic Rifles (A51 D27)' 
		+ '<Option value="537">Set of Twin Garza 9s (A53 D24)' 
		+ '<Option value="341">Set of Veteran Dog Tags (A40 D42)' 
		+ '<Option value="857">Shadow Transporter (A77 D60)' 
		+ '<Option value="774">Shark Tooth Club (A58 D31)' 
		+ '<Option value="4612">Showboat (A49 D41)' 
		+ '<Option value="712">Showman (A46 D27)' 
		+ '<Option value="1904">ShrapShield (A59 D30)' 
		+ '<Option value="2438">Sidewinder (A40 D79)' 
		+ '<Option value="2453">Signal Scrambler (A52 D26)' 
		+ '<Option value="646">Silenced Sniper Rifle (A70 D28)' 
		+ '<Option value="4458">Silent Thunder (A46 D74)' 
		+ '<Option value="969">Silk Thunder (A84 D59)' 
		+ '<Option value="2649">Skeleton Costume (A29 D31)' 
		+ '<Option value="3520">Slacker Jack (A0 D0)' 
		+ '<Option value="715">Sleek Bulletproof Vest (A45 D23)' 
		+ '<Option value="892">Sleeper Shot (A43 D73)' 
		+ '<Option value="2403">Sleeved Armored Vest (A37 D81)' 
		+ '<Option value="80">SMG (A23 D22)' 
		+ '<Option value="1752">Snake Fang (A61 D61)' 
		+ '<Option value="1909">Sneak (A38 D72)' 
		+ '<Option value="316">Sneak Attack (A43 D22)' 
		+ '<Option value="428">Snow Leopard (A37 D25)' 
		+ '<Option value="1750">Snow Resist Layer (A59 D63)' 
		+ '<Option value="1851">South African Ball (A17 D35)' 
		+ '<Option value="1852">South Korean Ball (A34 D18)' 
		+ '<Option value="775">Southhall Sedan (A32 D58)' 
		+ '<Option value="2104">Spanish 44 Caliber (A64 D31)' 
		+ '<Option value="295">Spare (A21 D21)' 
		+ '<Option value="2414">Spear Storm (A76 D34)' 
		+ '<Option value="2507">Spider Eater (A50 D28)' 
		+ '<Option value="4473">Spinal Jacket (A73 D32)' 
		+ '<Option value="5613">Spine Studded Jacket (A50 D66)' 
		+ '<Option value="500">Spitting Cobra (A46 D28)' 
		+ '<Option value="5321">Spitting Spider (A35 D50)' 
		+ '<Option value="2432">Split Aces (A29 D56)' 
		+ '<Option value="2110">Spoleto (A71 D39)' 
		+ '<Option value="1785">Sports Fanatic (A74 D39)' 
		+ '<Option value="4594">Spur Tortoise (A26 D43)' 
		+ '<Option value="759">Stage Show Tiger (A28 D50)' 
		+ '<Option value="5308">Steel Apron (A42 D75)' 
		+ '<Option value="1941">Steel Curtain (A21 D45)' 
		+ '<Option value="5370">Steel Plate Greaves (A37 D72)' 
		+ '<Option value="5322">Steel Toe Boots (A20 D55)' 
		+ '<Option value="777">Steller Sea Lion (A29 D59)' 
		+ '<Option value="90">Stolen Mail Truck (A10 D20)' 
		+ '<Option value="4461">Stretch Classic (A31 D78)' 
		+ '<Option value="739">Striker (A47 D35)' 
		+ '<Option value="755">Suit of Suits (A46 D24)' 
		+ '<Option value="906">Sumatra Tiger (A60 D30)' 
		+ '<Option value="495">Sumotori Fighter (A17 D25)' 
		+ '<Option value="581">Supercharged 4x4 (A27 D14)' 
		+ '<Option value="579">Supercharged CM Seta (A16 D29)' 
		+ '<Option value="583">Supercharged CM Venga (A29 D17)' 
		+ '<Option value="582">Supercharged Dvina (A28 D18)' 
		+ '<Option value="593">Supercharged El Rey Roadster (A46 D32)' 
		+ '<Option value="580">Supercharged Escalade (A13 D30)' 
		+ '<Option value="596">Supercharged Fugama Hasu (A51 D27)' 
		+ '<Option value="589">Supercharged Gold-Plated RUF (A37 D16)' 
		+ '<Option value="584">Supercharged GX9 (A30 D15)' 
		+ '<Option value="587">Supercharged Le Tigre (A26 D38)' 
		+ '<Option value="595">Supercharged Low Rider Vehicle (A19 D50)' 
		+ '<Option value="586">Supercharged Mara Serpiente (A21 D37)' 
		+ '<Option value="590">Supercharged Montaine 320 (A38 D12)' 
		+ '<Option value="578">Supercharged Sedan (A15 D28)' 
		+ '<Option value="592">Supercharged Stock Car (A45 D24)' 
		+ '<Option value="591">Supercharged Trio Mesa (A25 D44)' 
		+ '<Option value="594">Supercharged Trio Wildfire GT (A29 D49)' 
		+ '<Option value="588">Supercharged V8 (A36 D17)' 
		+ '<Option value="585">Supercharged Veyron (A20 D36)' 
		+ '<Option value="1717">Sure Fire (A33 D16)' 
		+ '<Option value="5615">Swiss Pike (A42 D76)' 
		+ '<Option value="545">Synthetic Steel (A18 D52)' 
		+ '<Option value="4611">Tactical Hatchet (A50 D35)' 
		+ '<Option value="3518">The Kid (A0 D0)' 
		+ '<Option value="3519">The Professional (A0 D0)' 
		+ '<Option value="738">The Wall (A23 D39)' 
		+ '<Option value="2207">Thermal Shielding (A57 D30)' 
		+ '<Option value="1782">Thigh Will Be Done (A74 D30)' 
		+ '<Option value="1868">Thigh Will Be Done (A77 D33)' 
		+ '<Option value="1869">Thigh Will Be Done (A81 D36)' 
		+ '<Option value="630">Thugs Bunny (A50 D28)' 
		+ '<Option value="2502">Tiki Mask (A62 D35)' 
		+ '<Option value="379">Timber Wolf (A41 D20)' 
		+ '<Option value="972">Titus 350 (A48 D24)' 
		+ '<Option value="871">Toco Toucan (A35 D81)' 
		+ '<Option value="416">Tommy Gun Ornament (A20 D13)' 
		+ '<Option value="1945">Total Eclipse (A76 D45)' 
		+ '<Option value="629">Toy Box Car (A24 D14)' 
		+ '<Option value="309">Traje de Balas (A10 D39)' 
		+ '<Option value="768">Trio Berella (A32 D23)' 
		+ '<Option value="717">Trio Diva (A25 D45)' 
		+ '<Option value="1906">Trio Regency (A66 D33)' 
		+ '<Option value="224">Tri-Point Hat (A8 D12)' 
		+ '<Option value="1826">Trouble Maker (A55 D46)' 
		+ '<Option value="694">Trusty 9 Iron (A20 D18)' 
		+ '<Option value="709">Turkey Vulture (A62 D50)' 
		+ '<Option value="870">Turnabout (A42 D80)' 
		+ '<Option value="1032">Ubijca Assault Rifle (A43 D18)' 
		+ '<Option value="402">Ugly Sweater (A15 D18)' 
		+ '<Option value="172">Uncle Motts\' Cargo Truck (A22 D14)' 
		+ '<Option value="1857">Uruguay Ball (A36 D17)' 
		+ '<Option value="1853">USA Ball (A35 D16)' 
		+ '<Option value="138">Ushanka (A10 D20)' 
		+ '<Option value="2650">Vampire Bat (A67 D34)' 
		+ '<Option value="2651">Vampire Costume (A58 D28)' 
		+ '<Option value="5312">Venture Axe (A30 D72)' 
		+ '<Option value="888">Vindicator (A49 D25)' 
		+ '<Option value="214">Vintage Cruiser (A7 D26)' 
		+ '<Option value="757">Viva Las Vegas (A27 D50)' 
		+ '<Option value="780">War Wagon (A77 D43)' 
		+ '<Option value="5374">Wendigo (A83 D50)' 
		+ '<Option value="850">Whiplash (A69 D29)' 
		+ '<Option value="4477">White Knuckle Express (A44 D70)' 
		+ '<Option value="265">White Shturmovik (A45 D28)' 
		+ '<Option value="2133">White Tailed Deer (A23 D50)' 
		+ '<Option value="330">Whaambulance (A28 D5)' 
		+ '<Option value="541">Widow Maker (A27 D52)' 
		+ '<Option value="170">Wild Mustang (A16 D34)' 
		+ '<Option value="2653">Witch Costume (A60 D29)' 
		+ '<Option value="1905">Woodsman 22 (A24 D63)' 
		+ '<Option value="2111">Yak (A74 D43)' 
		+ '<Option value="1702">Yeti Snow Cruiser (A63 D26)' 
		+ '<Option value="321">YoZombie (A21 D18)' 
		+ '<Option value="2652">Zombie Costume (A27 D59)' 
		+ '<Option value="324">Zombie Cow (A25 D15)'; 


// **** MISSION LOOT ****

	var mission_loot = '<Option style="color:#33FF00;" value="QueueSet_64">-- MISSION LOOT --' 
		+ '<Option value="3008">Bad Habit (A46 D78)' 
		+ '<Option value="2115">Bambaiyya Rajah (A60 D55)' 
		+ '<Option value="1038">Black Irish (A84 D59)' 
		+ '<Option value="5623">Blackmail Light (A40 D76)' 
		+ '<Option value="998">Blockade Auto Shotgun (A58 D45)' 
		+ '<Option value="2116">Bollywood Superhit (A47 D81)' 
		+ '<Option value="5284">Brigadier (A80 D52)' 
		+ '<Option value="3005">Brown Cancer Crab (A52 D75)' 
		+ '<Option value="901">Camo Riot Gear (A56 D26)' 
		+ '<Option value="5283">Carry All Defense Vest (A27 D57)' 
		+ '<Option value="241">Chariot (A48 D12)' 
		+ '<Option value="5279">Chimney Sweep (A67 D32)' 
		+ '<Option value="879">Coyote (A37 D64)' 
		+ '<Option value="5627">Crab Claw Cutter (A81 D37)' 
		+ '<Option value="5289">Crystalline (A73 D35)' 
		+ '<Option value="873">D-07 Proximity Mine (A70 D39)' 
		+ '<Option value="884">Death\'s Door (A57 D27)' 
		+ '<Option value="845">Deer Hunter (A51 D44)' 
		+ '<Option value="5621">Deft Touch (A73 D44)' 
		+ '<Option value="886">Exploding Pumpkin (A72 D33)' 
		+ '<Option value="874">Field Rider (A21 D71)' 
		+ '<Option value="903">Field Vest (A42 D70)' 
		+ '<Option value="698">French Kiss (A75 D45)' 
		+ '<Option value="997">FSB Agent (A42 D76)' 
		+ '<Option value="5282">Fume Proof Mask (A30 D69)' 
		+ '<Option value="1842">Goalie (A45 D58)' 
		+ '<Option value="362">Gravy Boat (A40 D24)' 
		+ '<Option value="876">Grim Reaper (A67 D51)' 
		+ '<Option value="878">Grip Gloves (A41 D66)' 
		+ '<Option value="5290">Harpoon GT (A72 D43)' 
		+ '<Option value="881">Hippopotamus (A63 D46)' 
		+ '<Option value="904">Infighter (A71 D44)' 
		+ '<Option value="891">Infiltration Gear (A72 D40)' 
		+ '<Option value="1037">Irish Traveler (A52 D63)' 
		+ '<Option value="846">Jackal ATV (A50 D67)' 
		+ '<Option value="5624">Jackalope (A77 D42)' 
		+ '<Option value="781">Mach-4 (A66 D48)' 
		+ '<Option value="3007">Martian Canal Boat (A43 D71)' 
		+ '<Option value="889">Monterey Manta (A58 D34)' 
		+ '<Option value="902">Nail Biter (A35 D58)' 
		+ '<Option value="843">New Years Party Bus (A42 D52)' 
		+ '<Option value="844">New Years Resolution (A69 D46)' 
		+ '<Option value="5628">Ostrich Egg Bomb (A82 D41)' 
		+ '<Option value="400">Pair of Nitro Skates (A19 D36)' 
		+ '<Option value="697">Parisian Fixer (A30 D61)' 
		+ '<Option value="5626">Rainbow Boa (A80 D50)' 
		+ '<Option value="5295">Red Scorpion (A36 D67)' 
		+ '<Option value="708">Rogue CIA Agent (A69 D30)' 
		+ '<Option value="5625">Screech Owl (A48 D78)' 
		+ '<Option value="880">Set of Roaring 20\'s (A35 D62)' 
		+ '<Option value="3006">Set of Throwing Spikes (A45 D66)' 
		+ '<Option value="2468">Snowdrift (A83 D38)' 
		+ '<Option value="883">Spy (A62 D44)' 
		+ '<Option value="5286">Steel Plate Jacket (A42 D70)' 
		+ '<Option value="885">Supercharged Hearse (A28 D61)' 
		+ '<Option value="882">Tetanus (A39 D63)' 
		+ '<Option value="1843">Tiebreaker (A76 D42)' 
		+ '<Option value="5291">Toaster (A34 D73)' 
		+ '<Option value="730">Urban Night Fighter (A55 D39)' 
		+ '<Option value="5622">War Kilt (A46 D74)' 
		+ '<Option value="887">Windguard Helmet (A27 D48)' 
		+ '<Option value="5294">Yellow Sea Snake (A64 D40)' 
		+ '<Option value="877">Z17 Micro (A69 D45)' 
		+ '<Option value="728">Z4 Night Prowler (A57 D35)';
			
// **** FIGHT LOOT ****	
	
	var fight_loot = '<Option style="color:#33FF00;" value="QueueSet_50">-- FIGHT LOOT --' 
		+ '<Option value="1805">12 Gauge (A35 D51)' 
		+ '<Option value="1134">Autoboatome (A33 D71)' 
		+ '<Option value="7038">Beluga (A69 D45)' 
		+ '<Option value="1809">Bomb Suit (A22 D52)' 
		+ '<Option value="2097">Buzzard Combat Chopper (A54 D30)' 
		+ '<Option value="1705">Cataclysmic (A53 D26)' 
		+ '<Option value="831">Cerebro (A63 D37)' 
		+ '<Option value="1997">Climber Leggings (A50 D85)' 
		+ '<Option value="1811">Cobra G7 (A53 D25)' 
		+ '<Option value="1814">Condor (A37 D50)' 
		+ '<Option value="1711">Contender (A33 D63)' 
		+ '<Option value="1816">Cougar (A51 D32)' 
		+ '<Option value="503">Cue Ball (A19 D16)' 
		+ '<Option value="1807">Devastator (A52 D36)' 
		+ '<Option value="2096">Domestic Defense (A53 D35)' 
		+ '<Option value="7036">Fearsome Flying Fortress (A47 D80)' 
		+ '<Option value="7037">Femme Shot (A81 D45)' 
		+ '<Option value="1133">Flood Damage (A40 D70)' 
		+ '<Option value="644">Glance 32 SR (A33 D72)' 
		+ '<Option value="2670">Golden Poison Frog (A30 D75)' 
		+ '<Option value="1713">Growler (A33 D65)' 
		+ '<Option value="7039">Gun Barge (A50 D36)' 
		+ '<Option value="1714">Hack N Slash (A65 D35)' 
		+ '<Option value="1132">Hail Storm Jacket (A72 D36)' 
		+ '<Option value="2706">Idle Hands (A45 D79)' 
		+ '<Option value="2656">M45 Overcast (A66 D44)' 
		+ '<Option value="1542">Nak Kha Shotgun (A47 D31)' 
		+ '<Option value="2654">Nyala (A40 D65)' 
		+ '<Option value="2655">Ottoman Krug (A43 D64)' 
		+ '<Option value="2657">Phantasm (A67 D45)' 
		+ '<Option value="1815">Rhinoceros (A20 D54)' 
		+ '<Option value="1812">Ruby Red (A38 D52)' 
		+ '<Option value="1808">Segmented Body Plate (A50 D31)' 
		+ '<Option value="830">Shaw\'s Submarine (A63 D35)' 
		+ '<Option value="1810">Skull Cap (A28 D51)' 
		+ '<Option value="2704">Slipstream (A44 D78)' 
		+ '<Option value="1709">Spiked Baton (A58 D28)' 
		+ '<Option value="528">String of Firecrackers (A33 D46)' 
		+ '<Option value="2667">Tainted Blades (A35 D74)' 
		+ '<Option value="2705">Talon (A79 D44)' 
		+ '<Option value="1506">Tanto (A43 D28)' 
		+ '<Option value="2098">Tasmanian Devil (A53 D38)' 
		+ '<Option value="2668">Toxic Gas Scrubber (A74 D37)' 
		+ '<Option value="1813">Turbo Road Warrior (A51 D35)' 
		+ '<Option value="1507">Type-103 Machine Gun (A42 D29)' 
		+ '<Option value="2669">Venomous (A75 D34)' 
		+ '<Option value="2703">Windswept (A78 D43)' 
		+ '<Option value="2095">Woodsman (A27 D54)' 
		+ '<Option value="829">X-Men Suit (A51 D51)' 
		+ '<Option value="1806">Zeus (A54 D18)'; 

// **** WAR LOOT ****	
	
	var war_loot = '<Option style="color:#33FF00;" value="QueueSet_33">-- WAR LOOT --' 		
		+ '<Option value="1760">Amur River Boat (A69 D50)' 
		+ '<Option value="1761">Bayou Trike (A61 D48)' 
		+ '<Option value="1763">California Condor (A42 D62)' 
		+ '<Option value="1764">Curled Horn Helm (A71 D51)' 
		+ '<Option value="2710">Deimos Dagger (A78 D65)' 
		+ '<Option value="1708">Duster (A27 D56)' 
		+ '<Option value="1780">Fallen Angel Arm (A37 D79)' 
		+ '<Option value="1870">Fallen Angel Arm (A40 D82)' 
		+ '<Option value="1871">Fallen Angel Arm (A42 D85)' 
		+ '<Option value="1765">Force Fire (A52 D70)' 
		+ '<Option value="1712">Galapagos Hawk (A64 D32)' 
		+ '<Option value="1766">Growler Firearm (A58 D45)' 
		+ '<Option value="1767">Heat Seeker (A46 D60)' 
		+ '<Option value="1768">Hook Sword (A72 D51)' 
		+ '<Option value="1769">Juggernaut (A65 D79)' 
		+ '<Option value="1762">Juvenile Tiger (A70 D51)' 
		+ '<Option value="1771">King Cobra (A80 D62)' 
		+ '<Option value="2711">Leg Up (A80 D61)' 
		+ '<Option value="2712">Mud Crawler (A60 D81)' 
		+ '<Option value="2714">Orangutan (A82 D68)' 
		+ '<Option value="1710">Pair of Armored Biker Boots (A27 D59)' 
		+ '<Option value="1772">Pisces Harpoon Gun (A64 D78)' 
		+ '<Option value="1770">Rhino Helmet (A71 D49)' 
		+ '<Option value="1773">Rhinoceros Beetle (A52 D72)' 
		+ '<Option value="1774">Roadster Rage (A53 D72)' 
		+ '<Option value="1706">Savanna Baboon (A25 D54)' 
		+ '<Option value="1775">Scottish Wild Cat (A71 D50)' 
		+ '<Option value="1776">Sheet Metal Blade (A79 D63)' 
		+ '<Option value="1777">Simian Safeguard (A43 D58)' 
		+ '<Option value="1707">Snapping Turtle (A56 D25)' 
		+ '<Option value="1778">Snow Drift (A54 D72)' 
		+ '<Option value="1779">Tlingit Parka (A64 D81)' 
		+ '<Option value="2713">Zorse (A81 D66)'; 
	
// **** GIFTING LOOT ****	
	
	var gifting_loot = '<Option style="color:#33FF00;" value="QueueSet_112">-- GIFTING LOOT --' 
		+ '<Option value="703">1955 Monique (A14 D22)' 
		+ '<Option value="460">Anaconda (A42 D23)' 
		+ '<Option value="745">Arabian Leopard (A20 D16)' 
		+ '<Option value="155">ATV (A18 D32)' 
		+ '<Option value="693">Bad Hair Day (A13 D23)' 
		+ '<Option value="746">Badger (A17 D19)' 
		+ '<Option value="333">Balloon Boy (A10 D28)' 
		+ '<Option value="621">Barbwire Bat (A21 D16)' 
		+ '<Option value="695">Bicycle Chain (A22 D15)' 
		+ '<Option value="2080">Big 66 (A19 D23)' 
		+ '<Option value="397">Blitzen (A16 D21)' 
		+ '<Option value="159">Bloody Mop (A18 D14)' 
		+ '<Option value="158">Bloody Webby (A22 D15)' 
		+ '<Option value="298">Blunderbuss (A27 D7)' 
		+ '<Option value="440">Bobsled (A15 D24)' 
		+ '<Option value="273">Bonnie & Clyde\'s B-400 (A32 D19)' 
		+ '<Option value="515">Box of Rotten Chocolates (A21 D14)' 
		+ '<Option value="1571">British Officer\'s Sword (A20 D10)' 
		+ '<Option value="747">Buffalo (A25 D12)' 
		+ '<Option value="439">Candy Cane (A20 D12)' 
		+ '<Option value="749">Cassowary (A18 D18)' 
		+ '<Option value="702">Champagne Shiv (A20 D11)' 
		+ '<Option value="679">Charm 84 MH (A20 D13)' 
		+ '<Option value="451">Chest Protector (A22 D36)' 
		+ '<Option value="264">Claymore (A19 D10)' 
		+ '<Option value="2077">Club Owner (A16 D23)' 
		+ '<Option value="733">Coilgun (A23 D11)' 
		+ '<Option value="640">Depth Charge (A23 D40)' 
		+ '<Option value="748">Dingo (A13 D24)' 
		+ '<Option value="751">Electric Eel (A36 D20)' 
		+ '<Option value="429">Escort (A21 D39)' 
		+ '<Option value="339">Executioner Drone (A42 D22)' 
		+ '<Option value="710">F-25 Valkyrie (A43 D66)' 
		+ '<Option value="732">FAIL Knuckles (A22 D15)' 
		+ '<Option value="2511">Falling Skies Technical (A36 D48)' 
		+ '<Option value="2078">Fat Cat (A15 D24)' 
		+ '<Option value="2081">Fear and Loathing (A24 D17)' 
		+ '<Option value="701">French Beret (A8 D21)' 
		+ '<Option value="501">Fugama Kondoru (A25 D47)' 
		+ '<Option value="194">Garza 9 (A25 D10)' 
		+ '<Option value="326">Ghost Thug (A10 D20)' 
		+ '<Option value="427">Gift Wagon (A18 D29)' 
		+ '<Option value="614">Green Limo (A19 D17)' 
		+ '<Option value="14">Grenade Launcher (A14 D10)' 
		+ '<Option value="425">GrowPet (A27 D12)' 
		+ '<Option value="306">Guerilla Truck (A15 D31)' 
		+ '<Option value="2079">Hardway (A24 D18)' 
		+ '<Option value="517">Heart Breaker (A21 D13)' 
		+ '<Option value="104">Hedge Clippers (A24 D6)' 
		+ '<Option value="435">Holiday Scarf (A13 D24)' 
		+ '<Option value="465">Huey (A47 D20)' 
		+ '<Option value="574">Hyena on Chain (A20 D16)' 
		+ '<Option value="135">Impression (A15 D35)' 
		+ '<Option value="622">Inflatable Motorboat (A13 D21)' 
		+ '<Option value="681">Ingred 9-9 (A14 D22)' 
		+ '<Option value="119">Kamas (A13 D17)' 
		+ '<Option value="752">Kangaroo (A30 D29)' 
		+ '<Option value="753">King Cheetah (A21 D42)' 
		+ '<Option value="680">King Snake (A23 D12)' 
		+ '<Option value="254">Kingfish Powerboat (A20 D34)' 
		+ '<Option value="322">Kraken (A24 D41)' 
		+ '<Option value="283">Le Tigre (A26 D15)' 
		+ '<Option value="4401">Love Sick (A27 D51)' 
		+ '<Option value="213">Low Rider (A12 D44)' 
		+ '<Option value="613">Lucky Hat (A17 D20)' 
		+ '<Option value="423">Lump of Coal (A22 D14)' 
		+ '<Option value="2112">Maltese Falcon (A42 D65)' 
		+ '<Option value="1846">Medic Cart (A19 D18)' 
		+ '<Option value="436">Mistletoe Launcher (A23 D13)' 
		+ '<Option value="394">Modified Tommy Gun (A21 D13)' 
		+ '<Option value="530">Mr. Pinchy (A22 D12)' 
		+ '<Option value="327">Mystery Van (A15 D15)' 
		+ '<Option value="502">Pair of Bladed Tonfas (A22 D19)' 
		+ '<Option value="441">Pair of Ice Skates (A16 D20)' 
		+ '<Option value="396">Pair of Santa\'s Helpers (A26 D8)' 
		+ '<Option value="743">Pair of Soccer Cleats (A24 D15)' 
		+ '<Option value="1845">Pair of Spiked Cleats (A24 D18)' 
		+ '<Option value="143">Pair of Weighted Knuckle Gloves (A18 D11)' 
		+ '<Option value="353">Parade Balloon (A14 D28)' 
		+ '<Option value="742">Penalty Shot (A8 D21)' 
		+ '<Option value="351">Pigskin Helmet (A18 D24)' 
		+ '<Option value="433">Pile of Snowballs (A11 D18)' 
		+ '<Option value="750">Piranha (A23 D35)' 
		+ '<Option value="352">Potato Masher (A26 D17)' 
		+ '<Option value="236">Puggio (A17 D23)' 
		+ '<Option value="299">Ranger Body Armor (A15 D38)' 
		+ '<Option value="242">Really Bloody Mop (A22 D15)' 
		+ '<Option value="1569">Reinforced Bowler (A12 D21)' 
		+ '<Option value="995">RM Crumpet (A19 D15)' 
		+ '<Option value="124">Ronin Motorcycle (A36 D14)' 
		+ '<Option value="123">Samurai Sword (A35 D15)' 
		+ '<Option value="208">Saturday Night Special (A18 D12)' 
		+ '<Option value="438">Set of Black Roses (A20 D14)' 
		+ '<Option value="612">Shamrock (A16 D21)' 
		+ '<Option value="674">Shuttlecock Grenade (A22 D14)' 
		+ '<Option value="734">Slap Shot (A22 D16)' 
		+ '<Option value="398">Snow Fort (A7 D25)' 
		+ '<Option value="437">Snowboard (A8 D22)' 
		+ '<Option value="2470">Southlander (A43 D30)' 
		+ '<Option value="504">Stun Baton (A24 D17)' 
		+ '<Option value="1847">Sudden Death (A20 D10)' 
		+ '<Option value="434">Surprise Mobile (A11 D23)' 
		+ '<Option value="682">Survival Pack (A22 D15)' 
		+ '<Option value="285">Tigershark Submersible (A37 D18)' 
		+ '<Option value="162">Tire Iron (A18 D15)' 
		+ '<Option value="328">Treat Bag (A18 D15)' 
		+ '<Option value="573">Trio Soprano (A53 D26)' 
		+ '<Option value="350">Turkey Silencer (A28 D13)' 
		+ '<Option value="531">Water Gun (A18 D12)' 
		+ '<Option value="2082">Yo Eleven (A24 D16)' 
		+ '<Option value="210">Zip Gun (A24 D16)' 
		+ '<Option value="575">Zip Line (A15 D20)';

// **** PROPERTY LOOT ****	
	
	var property_loot = '<Option style="color:#33FF00;" value="QueueSet_185">-- PROPERTY LOOT --' 
		+ '<Option value="1794">Aluminum Bat (A71 D30)' 
		+ '<Option value="1795">Aluminum Bat (A75 D33)' 
		+ '<Option value="1937">Amur Leopard (A69 D34)' 
		+ '<Option value="632">Andresen 420si (A41 D43)' 
		+ '<Option value="11094">Bat-Eared Fox (A55 D81)' 
		+ '<Option value="2665">Bear-Proof Suit (A55 D65)' 
		+ '<Option value="4557">Blazing Santoku (A35 D18)' 
		+ '<Option value="549">Blood Rain (A30 D51)' 
		+ '<Option value="1509">BRM-38 (A23 D38)' 
		+ '<Option value="11093">Camo Ammo Belt (A82 D50)' 
		+ '<Option value="250">Carmine\'s Lucky Lapel Pin (A34 D11)' 
		+ '<Option value="340">Chevalier Exoskeleton (A18 D43)' 
		+ '<Option value="7043">Chianina Taurus Bull (A69 D43)' 
		+ '<Option value="604">City Inspector\'s Uniform (A30 D37)' 
		+ '<Option value="1505">Cleaver (A25 D44)' 
		+ '<Option value="310">CM Dragon (A40 D18)' 
		+ '<Option value="563">CM Santiago R10 (A42 D30)' 
		+ '<Option value="2785">Coconut Crab (A56 D76)' 
		+ '<Option value="1110">Coconut Crab (A46 D60)' 
		+ '<Option value="151">Compound Bow (A27 D13)' 
		+ '<Option value="2638">Conchiglia (A35 D55)' 
		+ '<Option value="278">Curare Gun (A40 D12)' 
		+ '<Option value="225">Davy Crockett Hat (A21 D9)' 
		+ '<Option value="1836">Day Rider 2K (A45 D50)' 
		+ '<Option value="2805">Day Rider 2K (A60 D80)' 
		+ '<Option value="478">Deadly Car Bomb (A42 D36)' 
		+ '<Option value="473">Deadly Flamethrower (A35 D24)' 
		+ '<Option value="471">Deadly AA-12 Auto Shotgun (A34 D18)' 
		+ '<Option value="2791">Desert Eyes (A58 D77)' 
		+ '<Option value="1115">Desert Eyes (A48 D59)' 
		+ '<Option value="2325">Dirty Trick (A45 D49)' 
		+ '<Option value="2797">Dirty Trick (A57 D76)' 
		+ '<Option value="4558">Double Dare (A20 D36)' 
		+ '<Option value="161">Dragon Skin Body Armor (A12 D28)' 
		+ '<Option value="2326">Electric Prod (A50 D50)' 
		+ '<Option value="2798">Electric Prod (A78 D52)' 
		+ '<Option value="381">Elephant Gun (A43 D17)' 
		+ '<Option value="7044">Emu Ghillie Suit (A70 D39)' 
		+ '<Option value="2635">Escalation (A47 D37)' 
		+ '<Option value="2324">Extended Cab 640 (A53 D55)' 
		+ '<Option value="2807">Extended Cab 640 (A62 D84)' 
		+ '<Option value="2644">Fanteria (A23 D71)' 
		+ '<Option value="662">First Blood (A49 D13)' 
		+ '<Option value="2793">Five Finger Fortification (A65 D80)' 
		+ '<Option value="1117">Five Finger Fortification (A53 D68)' 
		+ '<Option value="252">Flak Jacket (A10 D25)' 
		+ '<Option value="4585">Forearm Guard (A38 D30)' 
		+ '<Option value="2190">Full Body Armor (A47 D40)' 
		+ '<Option value="1837">Future Shock 1985 (A42 D42)' 
		+ '<Option value="200">Gaff hook (A20 D35)' 
		+ '<Option value="240">Galea (A18 D45)' 
		+ '<Option value="335">Gene Splicer (A27 D16)' 
		+ '<Option value="1835">General Ulysses (A38 D28)' 
		+ '<Option value="311">Ghillie Suit (A16 D42)' 
		+ '<Option value="83">Gold Mac-10 (A30 D30)' 
		+ '<Option value="2658">Good Neighbor (A70 D47)' 
		+ '<Option value="7045">Grump Truck (A41 D72)' 
		+ '<Option value="2327">Hack Blade (A45 D51)' 
		+ '<Option value="2799">Hack Blade (A60 D79)' 
		+ '<Option value="126">Half Dollar Body Armor (A13 D30)' 
		+ '<Option value="634">Hunter \'Spy\' XS (A52 D29)' 
		+ '<Option value="2804">Hunter \'Spy\' XS (A76 D55)' 
		+ '<Option value="4587">Iron Chest Plate (A49 D57)' 
		+ '<Option value="1033">Klyk-9 Machine Pistol (A21 D43)' 
		+ '<Option value="8089">Kung-Fu Outfit (A35 D74)' 
		+ '<Option value="8090">Kung-Fu Outfit (A38 D76)' 
		+ '<Option value="8091">Kung-Fu Outfit (A41 D78)' 
		+ '<Option value="2663">Lantern Fish (A72 D51)' 
		+ '<Option value="664">Laser Guided RPG (A37 D42)' 
		+ '<Option value="1722">Legacy (A70 D47)' 
		+ '<Option value="4561">Lock and Stock (A50 D58)' 
		+ '<Option value="2786">Malayan Tiger (A79 D58)' 
		+ '<Option value="1111">Malayan Tiger (A64 D48)' 
		+ '<Option value="8082">Mamacita (A80 D44)' 
		+ '<Option value="8083">Mamacita (A83 D45)' 
		+ '<Option value="8084">Mamacita (A84 D47)' 
		+ '<Option value="8102">Man Eating Plant (A80 D49)' 
		+ '<Option value="8103">Man Eating Plant (A83 D51)' 
		+ '<Option value="8104">Man Eating Plant (A84 D54)' 
		+ '<Option value="2187">Mariner\'s Suit (A43 D39)' 
		+ '<Option value="2320">Midnight (A28 D33)' 
		+ '<Option value="2191">MNU Suit (A31 D50)' 
		+ '<Option value="7047">Mobile Fortress (A70 D42)' 
		+ '<Option value="633">Mugati Sport (A35 D51)' 
		+ '<Option value="2803">Mugati Sport (A51 D75)' 
		+ '<Option value="4559">Need a Jump? (A38 D38)' 
		+ '<Option value="661">Ninja Sai (A30 D40)' 
		+ '<Option value="8092">Nun Chucks (A79 D41)' 
		+ '<Option value="8093">Nun Chucks (A81 D42)' 
		+ '<Option value="8094">Nun Chucks (A83 D44)' 
		+ '<Option value="7042">Nyathi (A40 D73)' 
		+ '<Option value="2637">Osprey (A52 D24)' 
		+ '<Option value="1796">Padded Jersey (A37 D77)' 
		+ '<Option value="1797">Padded Jersey (A40 D81)' 
		+ '<Option value="2662">Pair of Armored Shoulder Pads (A43 D71)' 
		+ '<Option value="334">Pair of Ocular Implants (A25 D26)' 
		+ '<Option value="555">Pair of Optiks (A23 D36)' 
		+ '<Option value="2186">Pair of Plastic Leggings (A33 D41)' 
		+ '<Option value="2328">Pair of Stun Knuckles (A52 D48)' 
		+ '<Option value="2800">Pair of Stun Knuckles (A83 D55)' 
		+ '<Option value="2671">Pair of Traceless Gloves (A55 D28)' 
		+ '<Option value="625">Pair of Trekker Boots (A23 D38)' 
		+ '<Option value="2321">Palermo Luxury (A36 D35)' 
		+ '<Option value="4586">Pantheon Tactical Helm (A55 D48)' 
		+ '<Option value="1721">Patriot (A53 D68)' 
		+ '<Option value="1734">Pay Back (A65 D43)' 
		+ '<Option value="2661">Pesce Spada (A71 D35)' 
		+ '<Option value="378">Pinstripe Suit (A21 D38)' 
		+ '<Option value="2664">Pirahna XE (A72 D55)' 
		+ '<Option value="2660">Pitch Car (A50 D70)' 
		+ '<Option value="667">Plasma Rifle (A40 D47)' 
		+ '<Option value="2796">Plasma Rifle (A52 D75)' 
		+ '<Option value="8099">Poison Vines (A40 D74)' 
		+ '<Option value="8100">Poison Vines (A42 D78)' 
		+ '<Option value="8101">Poison Vines (A45 D79)' 
		+ '<Option value="2192">Power Armor (A43 D53)' 
		+ '<Option value="2790">Power Armor (A55 D75)' 
		+ '<Option value="4560">Predator Minigun (A55 D46)' 
		+ '<Option value="2188">Pressure Suit (A45 D40)' 
		+ '<Option value="2787">Raccoon (A60 D82)' 
		+ '<Option value="1112">Raccoon (A50 D67)' 
		+ '<Option value="666">Railgun (A51 D24)' 
		+ '<Option value="2659">Raven (A53 D69)' 
		+ '<Option value="566">Rebel 2 (A40 D45)' 
		+ '<Option value="569">Red Angel (A16 D49)' 
		+ '<Option value="2802">Red Angel (A49 D74)' 
		+ '<Option value="602">Rigged Traffic Cone (A28 D19)' 
		+ '<Option value="86">Riot Gear (A12 D28)' 
		+ '<Option value="462">Rising Sun (A28 D46)' 
		+ '<Option value="665">Robber\'s Utility Belt (A33 D41)' 
		+ '<Option value="552">Rolax Stealth (A18 D28)' 
		+ '<Option value="197">Ru-38 Pistol (A20 D24)' 
		+ '<Option value="565">Russian Dazatz 45 (A18 D46)' 
		+ '<Option value="259">Scarab 9mm Pistol (A32 D24)' 
		+ '<Option value="7048">Sharing Thoughts (A67 D42)' 
		+ '<Option value="631">Sirroco 9Z (A46 D15)' 
		+ '<Option value="7049">Slate Knife (A44 D68)' 
		+ '<Option value="2322">Sleek (A35 D37)' 
		+ '<Option value="2189">Sleek Torso Guard (A44 D46)' 
		+ '<Option value="2672">Smiley (A37 D51)' 
		+ '<Option value="2788">Snow Monkey (A62 D83)' 
		+ '<Option value="1113">Snow Monkey (A52 D71)' 
		+ '<Option value="564">Solar Flare (A34 D34)' 
		+ '<Option value="1840">Sonic Five (A32 D30)' 
		+ '<Option value="2673">Southern Stingray (A52 D35)' 
		+ '<Option value="1818">Sports Fanatic (A77 D42)' 
		+ '<Option value="1819">Sports Fanatic (A80 D45)' 
		+ '<Option value="1820">Sports Fanatic (A84 D49)' 
		+ '<Option value="2323">Sportster (A52 D46)' 
		+ '<Option value="2806">Sportster (A82 D62)' 
		+ '<Option value="2792">Spotted Vest (A79 D59)' 
		+ '<Option value="1116">Spotted Vest (A64 D51)' 
		+ '<Option value="4584">Sprinting Shoes (A25 D32)' 
		+ '<Option value="2795">Stout Shoulders (A65 D85)' 
		+ '<Option value="1119">Stout Shoulders (A58 D77)' 
		+ '<Option value="7050">Strike Soldier (A40 D68)' 
		+ '<Option value="2794">Strong Arm (A84 D68)' 
		+ '<Option value="1118">Strong Arm (A73 D56)' 
		+ '<Option value="8079">Tail Gunner (A36 D76)' 
		+ '<Option value="8080">Tail Gunner (A37 D80)' 
		+ '<Option value="8081">Tail Gunner (A39 D82)' 
		+ '<Option value="562">Tasmanian (A36 D34)' 
		+ '<Option value="301">Tesla PD Gun (A18 D42)' 
		+ '<Option value="567">Thai XS Max (A45 D35)' 
		+ '<Option value="2666">Tiger Claw (A73 D56)' 
		+ '<Option value="282">Tigerskin Armored Vest (A12 D30)' 
		+ '<Option value="203">TNT (A42 D20)' 
		+ '<Option value="354">Tomahawk (A23 D19)' 
		+ '<Option value="568">Trio Napoli (A47 D23)' 
		+ '<Option value="380">Trio Wildfire GT (A18 D43)' 
		+ '<Option value="638">Trip Wire Bomb (A32 D19)' 
		+ '<Option value="1938">Tundra Wolf (A37 D68)' 
		+ '<Option value="663">Ultrasonic Gun (A22 D48)' 
		+ '<Option value="2640">Un Tuono (A60 D49)' 
		+ '<Option value="346">Utility Belt (A30 D30)' 
		+ '<Option value="348">Viking Helmet (A21 D37)' 
		+ '<Option value="2784">Warthog (A74 D60)' 
		+ '<Option value="2329">Wasper Knife (A51 D51)' 
		+ '<Option value="2801">Wasper Knife (A85 D65)' 
		+ '<Option value="2641">Water Truck (A45 D64)' 
		+ '<Option value="4583">Welding Mask (A30 D25)' 
		+ '<Option value="2789">Wildebeest (A85 D64)' 
		+ '<Option value="1114">Wildebeest (A74 D54)' 
		+ '<Option value="617">Winner\'s Wreath (A27 D38)' 
		+ '<Option value="129">AA-12 Auto Shotgun (A27 D15)';
			
// **** SECRET STASH LOOT ****	
	
	var secretstash_loot = '<Option style="color:#33FF00;" value="QueueSet_12">-- SECRET STASH LOOT --' 
		+ '<Option value="7030">Arachnid Cruiser (A65 D25)' 
		+ '<Option value="7034">Blizzard Cannon (A48 D84)' 
		+ '<Option value="7025">Cape Buffalo (A76 D59)' 
		+ '<Option value="7032">Final Word (A35 D52)' 
		+ '<Option value="7033">Heads Up (A28 D64)' 
		+ '<Option value="7029">Ice Climber (A54 D29)' 
		+ '<Option value="7026">Ice Climbing Gear (A28 D55)' 
		+ '<Option value="7031">Savannah Patroller (A82 D50)' 
		+ '<Option value="7024">Spider Monkey (A42 D62)' 
		+ '<Option value="7023">Tarantula (A53 D30)' 
		+ '<Option value="7028">Tundra Commmando (A55 D79)' 
		+ '<Option value="7027">Web Climbing Rope (A60 D45)';
	
// **** MISC LOOT ****	
	
	var misc_loot = '<Option style="color:#33FF00;" value="QueueSet_11">-- MISC LOOT --' 	
		+ '<Option value="827">Azazel\'s Sword (A62 D37)' 
		+ '<Option value="826">Havok\'s Chest (A38 D63)' 
		+ '<Option value="1131">House Fire (A74 D35)' 
		+ '<Option value="2467">Santa Slay (A42 D82)' 
		+ '<Option value="729">Set of Z4 Infiltrator Gear (A36 D57)' 
		+ '<Option value="2469">Snowflake (A40 D83)' 
		+ '<Option value="1130">Storm Chaser (A73 D30)' 
		+ '<Option value="1129">Structural Damage (A32 D72)' 
		+ '<Option value="1128">Thief (A71 D32)' 
		+ '<Option value="828">X-Men Blackbird (A33 D62)' 
		+ '<Option value="825">X-Men Crest (A32 D62)'; 

	
// **** MARKETPLACE LOOT ****	
	
	var marketplace_loot = '<Option style="color:#33FF00;" value="QueueSet_442">-- MARKETPLACE LOOT --' 	
		+ '<Option value="41">.50 Cal Pistol (A22 D21)' 
		+ '<Option value="985">2 Big 2 Fail (A61 D29)' 
		+ '<Option value="212">9mm Auto Pistol (A40 D10)' 
		+ '<Option value="1922">9mm Fury (A72 D49)' 
		+ '<Option value="684">African Lion (A58 D36)' 
		+ '<Option value="2463">Agave (A78 D42)' 
		+ '<Option value="279">Airboat (A16 D37)' 
		+ '<Option value="1306">Aircraft Carrier (A80 D38)' 
		+ '<Option value="52">AK-47 (A22 D21)' 
		+ '<Option value="706">Alligator (A27 D48)' 
		+ '<Option value="2482">Amenhoteps Khopesh (A49 D82)' 
		+ '<Option value="2481">Amon Ra\'s Barge (A82 D45)' 
		+ '<Option value="1553">Amphibian (A34 D57)' 
		+ '<Option value="2480">Anubian Cultist (A76 D76)' 
		+ '<Option value="900">Aquatic Rifle (A75 D41)' 
		+ '<Option value="260">Arana Net Gun (A16 D40)' 
		+ '<Option value="2143">Arbitrator (A67 D35)' 
		+ '<Option value="1800">Arctic Wolf (A31 D58)' 
		+ '<Option value="776">Ares (A59 D36)' 
		+ '<Option value="619">Armadillo Gear (A24 D53)' 
		+ '<Option value="1310">Armed Drone (A51 D27)' 
		+ '<Option value="45">Armed Guard (A8 D25)' 
		+ '<Option value="1927">Army Ants (A77 D51)' 
		+ '<Option value="1300">Assault Trooper (A22 D35)' 
		+ '<Option value="2444">Autumn Camo (A43 D78)' 
		+ '<Option value="2445">Autumn Harvester (A80 D41)' 
		+ '<Option value="2335">Avalanche (A32 D67)' 
		+ '<Option value="106">Axe (A21 D9)' 
		+ '<Option value="1554">Aztec (A51 D26)' 
		+ '<Option value="1565">B-52 Bomber (A59 D27)' 
		+ '<Option value="270">Baby Face Nelson\'s .351 (A21 D24)' 
		+ '<Option value="302">Ballesta de Muneca (A40 D20)' 
		+ '<Option value="2149">Ballistic Helmet (A35 D72)' 
		+ '<Option value="520">Battering Ram (A28 D14)' 
		+ '<Option value="223">Bayonet (A4 D16)' 
		+ '<Option value="1981">Belt Buckler (A46 D70)' 
		+ '<Option value="431">Best Friend (A23 D40)' 
		+ '<Option value="980">Big Apple (A46 D33)' 
		+ '<Option value="548">Bird of Prey (A29 D50)' 
		+ '<Option value="2439">Black Friday Mask (A79 D44)' 
		+ '<Option value="542">Black Widow (A28 D51)' 
		+ '<Option value="35">Bloody Chainsaw (A18 D16)' 
		+ '<Option value="36">Bloody Horse Head (A18 D16)' 
		+ '<Option value="149">Blowgun (A22 D8)' 
		+ '<Option value="2144">Blue Collar (A37 D68)' 
		+ '<Option value="57">Body Double (A10 D25)' 
		+ '<Option value="2089">Bomb Helmet (A32 D52)' 
		+ '<Option value="2344">Bone Cycle (A39 D76)' 
		+ '<Option value="141">Boomslang ACR (A27 D16)' 
		+ '<Option value="721">Boot Knife (A15 D33)' 
		+ '<Option value="773">Boulder Breaker (A37 D73)' 
		+ '<Option value="216">Broken Bottle (A21 D9)' 
		+ '<Option value="1917">Brown Pelican (A35 D64)' 
		+ '<Option value="405">Bugged Cell Phone (A19 D19)' 
		+ '<Option value="58">Bulletproof Trenchcoat (A10 D25)' 
		+ '<Option value="2125">Bullfrog (A29 D49)' 
		+ '<Option value="2092">Buzzsaw (A55 D35)' 
		+ '<Option value="2936">Cab Driver (A45 D85)' 
		+ '<Option value="1858">Canadian Lynx (A54 D84)' 
		+ '<Option value="308">Cane Cutter (A35 D5)' 
		+ '<Option value="39">Canister Bomb (A18 D16)' 
		+ '<Option value="229">Cannon (A33 D7)' 
		+ '<Option value="274">Capone\'s Armored 341A (A14 D42)' 
		+ '<Option value="2199">Car Cutter (A35 D62)' 
		+ '<Option value="38">Cattle Prod (A18 D16)' 
		+ '<Option value="24">Chainsaw (A18 D12)' 
		+ '<Option value="1910">Charleston Classic (A56 D26)' 
		+ '<Option value="464">Chemical Gas Mask (A29 D48)' 
		+ '<Option value="1302">Chimpanzee (A31 D59)' 
		+ '<Option value="507">Chinese Tiger (A26 D48)' 
		+ '<Option value="253">Chlori-tek GDS (A22 D33)' 
		+ '<Option value="2440">Chomps (A80 D37)' 
		+ '<Option value="983">Chop Suey Chaser (A37 D65)' 
		+ '<Option value="2441">Christy (A39 D81)' 
		+ '<Option value="115">Chrome Skyline (A12 D18)' 
		+ '<Option value="2135">Cinnabar P70 (A58 D28)' 
		+ '<Option value="103">Claw Hammer (A20 D10)' 
		+ '<Option value="2424">Clear Path (A71 D33)' 
		+ '<Option value="1921">Climbing Claws (A71 D45)' 
		+ '<Option value="2474">Clockwork Beetle (A42 D81)' 
		+ '<Option value="2084">CM Hatchback (A41 D41)' 
		+ '<Option value="1919">Cold Embrace (A67 D47)' 
		+ '<Option value="43">Combat Knife (A22 D21)' 
		+ '<Option value="2145">Company Car (A68 D33)' 
		+ '<Option value="726">Con Man (A60 D35)' 
		+ '<Option value="723">Concealed Armor (A22 D40)' 
		+ '<Option value="2426">Containment (A35 D72)' 
		+ '<Option value="207">COP357 (A32 D9)' 
		+ '<Option value="1313">Cottonmouth (A27 D54)' 
		+ '<Option value="2122">Cottonmouth Blade (A43 D23)' 
		+ '<Option value="430">Crazy Dragon (A41 D17)' 
		+ '<Option value="448">Cricket Bat (A29 D21)' 
		+ '<Option value="2120">Croc Catcher (A41 D24)' 
		+ '<Option value="547">Crop Duster (A52 D28)' 
		+ '<Option value="977">Cuban Underground (A29 D40)' 
		+ '<Option value="506">Cupid\'s Hit Squad (A47 D22)' 
		+ '<Option value="1825">Daddy\'O (A29 D60)' 
		+ '<Option value="498">Daisho (A31 D20)' 
		+ '<Option value="2201">Dark Squad Vest (A35 D65)' 
		+ '<Option value="320">Dead End (A32 D20)' 
		+ '<Option value="648">Deal Gone Bad (A51 D33)' 
		+ '<Option value="219">Decommissioned APC (A18 D37)' 
		+ '<Option value="2088">Defender Armored Car (A31 D50)' 
		+ '<Option value="606">Demolition Kit (A53 D38)' 
		+ '<Option value="2460">Desert Lynx (A75 D36)' 
		+ '<Option value="1566">Desert Storm G2 (A57 D27)' 
		+ '<Option value="275">Dillinger\'s Wooden Gun (A12 D45)' 
		+ '<Option value="896">Dive Scooter (A27 D59)' 
		+ '<Option value="897">Diver\'s Knife (A60 D33)' 
		+ '<Option value="893">Diving Gear (A56 D26)' 
		+ '<Option value="2345">Doom Gauntlet (A76 D41)' 
		+ '<Option value="133">Dragunov (A36 D14)' 
		+ '<Option value="2422">Dueling Shield (A35 D69)' 
		+ '<Option value="2461">Dune Rider Jacket (A76 D29)' 
		+ '<Option value="2341">Earthquake (A82 D45)' 
		+ '<Option value="359">Electric Carving Knife (A34 D18)' 
		+ '<Option value="1912">Eliminator 9mm (A57 D25)' 
		+ '<Option value="987">Elvis Impersonator (A20 D48)' 
		+ '<Option value="336">EMP Bomb (A4 D32)' 
		+ '<Option value="523">EMT (A18 D35)' 
		+ '<Option value="2156">Envy (A66 D36)' 
		+ '<Option value="2338">Eruption (A37 D70)' 
		+ '<Option value="277">Exploding Cigar (A35 D25)' 
		+ '<Option value="572">Exploding Teddy Bear (A55 D48)' 
		+ '<Option value="637">Explosive Putty (A31 D15)' 
		+ '<Option value="406">Explosive Watch (A29 D12)' 
		+ '<Option value="461">Ex-SEAL (A27 D45)' 
		+ '<Option value="725">Fake ID (A19 D42)' 
		+ '<Option value="318">Fake Vampire Teeth (A34 D15)' 
		+ '<Option value="1573">Falcon (A58 D27)' 
		+ '<Option value="2446">Falling Leaves (A50 D81)' 
		+ '<Option value="2339">Famine (A71 D36)' 
		+ '<Option value="518">Fire Axe (A26 D17)' 
		+ '<Option value="2142">Fire Starter (A31 D61)' 
		+ '<Option value="1572">Fistful of Keys (A24 D52)' 
		+ '<Option value="642">Flame Broiler (A56 D33)' 
		+ '<Option value="1928">Flame-Resistant Suit (A53 D79)' 
		+ '<Option value="40">Flamethrower (A22 D21)' 
		+ '<Option value="2085">Flex Guard (A42 D42)' 
		+ '<Option value="2471">Focal Distance (A44 D81)' 
		+ '<Option value="450">Football Cart (A16 D30)' 
		+ '<Option value="449">Football Helmet (A13 D26)' 
		+ '<Option value="458">Frogman (A40 D24)' 
		+ '<Option value="312">Fugama Gureihaundo-X (A22 D41)' 
		+ '<Option value="2423">Full Plate Armor (A69 D37)' 
		+ '<Option value="1801">Funnel Web Spider (A51 D43)' 
		+ '<Option value="305">Garza 12 Shotgun (A12 D29)' 
		+ '<Option value="2121">Gator (A22 D42)' 
		+ '<Option value="608">Gator 11-EK (A46 D29)' 
		+ '<Option value="653">Getaway Plane (A19 D47)' 
		+ '<Option value="173">Giavellotto (A16 D26)' 
		+ '<Option value="1923">Giraffe (A41 D72)' 
		+ '<Option value="1559">Glacier (A42 D25)' 
		+ '<Option value="234">Gladius (A24 D16)' 
		+ '<Option value="2152">Gluttony (A63 D30)' 
		+ '<Option value="2449">Go Fast Boat (A82 D45)' 
		+ '<Option value="21">Gold 9mm Gun (A15 D10)' 
		+ '<Option value="111">Gold Crowbar (A26 D23)' 
		+ '<Option value="127">Gold GX9 (A27 D18)' 
		+ '<Option value="84">Gold Machine Pistol (A30 D30)'
		+ '<option value="677">Golden Treasure Chest' 		
		+ '<Option value="32">Gold-Plated Magnum (A18 D16)' 
		+ '<Option value="2489">Gopher ATV (A59 D81)' 
		+ '<Option value="1915">Gorget (A38 D63)' 
		+ '<Option value="990">Grand Finale (A60 D25)' 
		+ '<Option value="337">Gravity Gun (A35 D20)' 
		+ '<Option value="1311">Great Horned Owl (A56 D28)' 
		+ '<Option value="1802">Great White Shark (A59 D21)' 
		+ '<Option value="2153">Greed (A31 D63)' 
		+ '<Option value="2202">Green Mamba (A72 D39)' 
		+ '<Option value="1803">Grizzly Bear (A25 D59)' 
		+ '<Option value="349">Guitar Case Machine Gun (A41 D26)' 
		+ '<Option value="1567">H-13 Med Evac (A32 D55)' 
		+ '<Option value="2083">Haig and Hower B200 (A40 D40)' 
		+ '<Option value="411">Haitian Drum (A44 D46)' 
		+ '<Option value="454">Haitian Relief Drum (A44 D46)' 
		+ '<Option value="1930">Hammer Hawk (A52 D82)' 
		+ '<Option value="2346">Hell Sickle (A36 D77)' 
		+ '<Option value="2490">Hellcat Cannon (A78 D55)' 
		+ '<Option value="248">Hellfire Auto-Shotgun (A32 D13)' 
		+ '<Option value="705">Hephaestus Cannon (A56 D26)' 
		+ '<Option value="2158">Her Pretty Head (A38 D76)' 
		+ '<Option value="607">Hijacked Crane (A33 D54)' 
		+ '<Option value="2113">Hill\'s Armored Transport (A27 D59)' 
		+ '<Option value="445">Hockey Stick (A23 D18)' 
		+ '<Option value="304">Hoja Doble (A30 D11)' 
		+ '<Option value="519">Hook and Ladder Truck (A15 D27)' 
		+ '<Option value="1804">Hopi Rattle Snake (A58 D32)' 
		+ '<Option value="244">Hornet Sniper Rifle (A11 D34)' 
		+ '<Option value="611">Horse Trailer (A22 D16)' 
		+ '<Option value="649">House Cat (A50 D37)' 
		+ '<Option value="496">Hung Chu Enforcer (A16 D24)' 
		+ '<Option value="154">Hunter\'s Vest (A14 D26)' 
		+ '<Option value="148">Hunting Knife (A21 D9)' 
		+ '<Option value="150">Hunting Rifle (A30 D10)' 
		+ '<Option value="722">Hush Puppy (A34 D16)' 
		+ '<Option value="233">Hydrofoil (A8 D38)' 
		+ '<Option value="1556">Ice Pick (A22 D35)' 
		+ '<Option value="2466">Igloo Shield (A82 D44)' 
		+ '<Option value="1560">Immersion Suit (A28 D44)' 
		+ '<Option value="554">Incognito ZX3000 (A35 D25)' 
		+ '<Option value="313">Inferno SAM Launcher (A40 D25)' 
		+ '<Option value="403">Infrared Scanner (A9 D22)' 
		+ '<Option value="332">Iron Bull (A28 D42)' 
		+ '<Option value="978">Iron Curtain (A30 D39)' 
		+ '<Option value="136">IZH-35m (A25 D15)' 
		+ '<Option value="2200">Jaws of Life (A35 D62)' 
		+ '<Option value="221">Jetpack Prototype (A38 D7)' 
		+ '<Option value="953">Jungle Machete (A69 D32)' 
		+ '<Option value="950">Jungle Wasp Bow (A46 D23)' 
		+ '<Option value="894">Killer Whale (A27 D56)' 
		+ '<Option value="2349">Kleinfeld\'s Boat (A25 D77)' 
		+ '<Option value="105">Knee-Capper (A16 D14)' 
		+ '<Option value="209">Knuckle Duster (A13 D27)' 
		+ '<Option value="293">Kodiak (A44 D28)' 
		+ '<Option value="118">Kunai (A18 D12)' 
		+ '<Option value="447">Lacross Stick (A18 D19)' 
		+ '<Option value="991">Lady Liberty (A33 D59)' 
		+ '<Option value="2352">Lamprey Eel (A81 D51)' 
		+ '<Option value="2334">Landslide (A67 D31)' 
		+ '<Option value="164">Lasso (A22 D8)' 
		+ '<Option value="620">Last Call (A45 D33)' 
		+ '<Option value="294">Lefty Guns\' Leather Coat (A10 D24)' 
		+ '<Option value="166">Lever Action Rifle (A31 D9)' 
		+ '<Option value="53">Light Anti Tank Weapon (A22 D21)' 
		+ '<Option value="2336">Lightning Strike (A65 D30)' 
		+ '<Option value="898">Limpet Mine (A29 D61)' 
		+ '<Option value="499">Lloyds Archangel (A32 D24)' 
		+ '<Option value="1913">Lloyds Zephyr (A63 D29)' 
		+ '<Option value="2421">Long Tailed Pangolin (A68 D40)' 
		+ '<Option value="407">Loose Caboose (A17 D30)' 
		+ '<Option value="1918">Lucella GTS (A43 D65)' 
		+ '<Option value="360">Lucky Wishbone (A16 D36)' 
		+ '<Option value="266">Lumberjack (A39 D18)' 
		+ '<Option value="2151">Lust (A29 D62)' 
		+ '<Option value="144">M32 Grenade Launcher (A28 D12)' 
		+ '<Option value="130">M468 Assault Rifle (A28 D14)' 
		+ '<Option value="1305">M9 Trebuchet (A40 D79)' 
		+ '<Option value="271">Ma Barker\'s Machine Gun (A30 D20)' 
		+ '<Option value="25">Mac-10 (A7 D5)' 
		+ '<Option value="2087">Mace (A30 D49)' 
		+ '<Option value="268">Machine Gun Kelly\'s Gun (A25 D14)' 
		+ '<Option value="31">Magnum (A8 D6)' 
		+ '<Option value="1916">Man Opener (A63 D40)' 
		+ '<Option value="2141">Mandrill (A35 D67)' 
		+ '<Option value="399">Marshmallow Overload (A39 D16)' 
		+ '<Option value="2131">Mason (A26 D57)' 
		+ '<Option value="82">Meat Hook (A23 D22)' 
		+ '<Option value="2473">Mechanized Crocodilian (A84 D49)' 
		+ '<Option value="2451">Miami Vice (A51 D82)' 
		+ '<Option value="551">\'Mightier\' Pen (A27 D13)' 
		+ '<Option value="2462">Mirage (A40 D77)' 
		+ '<Option value="2130">Molten Metallic (A55 D30)' 
		+ '<Option value="408">Motion Sensor Explosive (A39 D25)' 
		+ '<Option value="546">Mountain Goat (A22 D52)' 
		+ '<Option value="1563">Mounted Mini Gun (A26 D58)' 
		+ '<Option value="2123">Mud Slinger (A26 D47)' 
		+ '<Option value="2343">Mud Snake (A68 D32)' 
		+ '<Option value="2447">Murder of Crows (A49 D79)' 
		+ '<Option value="553">Murder Permit (A34 D19)' 
		+ '<Option value="226">Musket (A25 D5)' 
		+ '<Option value="650">My Little Friend (A51 D34)' 
		+ '<Option value="108">Nail Gun (A28 D12)' 
		+ '<Option value="120">Nambu Type 14 Pistol (A22 D8)' 
		+ '<Option value="101">Nicky\'s Harlem Special (A24 D23)' 
		+ '<Option value="2347">Nightmare (A77 D37)' 
		+ '<Option value="2442">Nightmare Claw (A80 D41)' 
		+ '<Option value="2094">Nile Crocodile (A57 D37)' 
		+ '<Option value="217">Off Duty Cop (A22 D18)' 
		+ '<Option value="2332">Offroad Racer (A75 D41)' 
		+ '<Option value="2101">Oppressor (A63 D31)' 
		+ '<Option value="1314">Opulence (A40 D83)' 
		+ '<Option value="772">Osprey Helicopter (A32 D67)' 
		+ '<Option value="1926">Pacific Manta (A75 D50)' 
		+ '<Option value="948">Pack Mule (A41 D22)' 
		+ '<Option value="168">Pair of Cowboy Boots (A15 D25)' 
		+ '<Option value="222">Pair of Flintlock Pistols (A14 D6)' 
		+ '<Option value="988">Pair of Kings (A56 D26)' 
		+ '<Option value="142">Pair of Pet Tigers (A28 D12)' 
		+ '<Option value="383">Pair of Sharkskin Gloves (A25 D37)' 
		+ '<Option value="446">Pair of Shin Guards (A16 D23)' 
		+ '<Option value="522">Pair of Shock Paddles (A36 D16)' 
		+ '<Option value="1555">Pair of Snow Shoes (A36 D21)' 
		+ '<Option value="163">Pair of Spurs (A20 D10)' 
		+ '<Option value="2342">Pair of Wired Shades (A42 D75)' 
		+ '<Option value="716">Palermo Prowler (A44 D19)' 
		+ '<Option value="2093">Panel Vest (A56 D36)' 
		+ '<Option value="2100">Pangolin AP (A27 D57)' 
		+ '<Option value="992">Parade Stallion (A60 D28)' 
		+ '<Option value="981">Party Favor (A45 D34)' 
		+ '<Option value="982">Party Popper (A32 D46)' 
		+ '<Option value="355">Pea Shooter (A26 D12)' 
		+ '<Option value="167">Pearl-Handled Revolver (A40 D10)' 
		+ '<Option value="1558">Penguin AquaCraft (A36 D25)' 
		+ '<Option value="2119">Pepperbox Pistol (A64 D30)' 
		+ '<Option value="2475">Perambulation (A80 D43)' 
		+ '<Option value="300">Personal Watercraft (A40 D14)' 
		+ '<Option value="296">Phoenix Hang-Glider (A38 D15)' 
		+ '<Option value="235">Pilum (A26 D14)' 
		+ '<Option value="639">Pipe Bomb (A38 D32)' 
		+ '<Option value="720">Poison Filled Ring (A32 D17)' 
		+ '<Option value="1557">Polar Bear (A43 D26)' 
		+ '<Option value="358">Potato Mash (A24 D21)' 
		+ '<Option value="102">Power Cutter (A35 D15)' 
		+ '<Option value="137">PPSH 41 Submachine gun (A22 D8)' 
		+ '<Option value="269">Pretty Boy Floyd\'s .45 (A22 D22)' 
		+ '<Option value="2157">Pride (A78 D40)' 
		+ '<Option value="986">Pyro Kit (A26 D53)' 
		+ '<Option value="432">Rabid Parrot (A35 D28)' 
		+ '<Option value="404">Radio Controlled Detonator (A23 D16)' 
		+ '<Option value="601">Railroad Tie (A15 D29)' 
		+ '<Option value="455">Rainy Day (A38 D22)' 
		+ '<Option value="976">Raven Claw (A56 D27)' 
		+ '<Option value="2476">Reaction Contraption (A85 D55)' 
		+ '<Option value="107">Reciprocating Saw (A26 D14)' 
		+ '<Option value="2203">Red 404 (A41 D82)' 
		+ '<Option value="2090">Red Back Spider (A33 D53)' 
		+ '<Option value="2140">Regalia Foxtrot (A34 D71)' 
		+ '<Option value="276">Reinforced Cement Mixer (A38 D19)' 
		+ '<Option value="410">Remote Controlled Sniper (A35 D20)' 
		+ '<Option value="2118">Rhino Hide (A25 D58)' 
		+ '<Option value="2450">Rico\'s Revenge (A81 D37)' 
		+ '<Option value="1925">Riding Hat (A48 D74)' 
		+ '<Option value="409">Rigged Model Airplane (A13 D41)' 
		+ '<Option value="643">Rigged Oil Tanker (A30 D57)' 
		+ '<Option value="641">Rigged Tanker Truck (A39 D29)' 
		+ '<Option value="605">Road Block Crew (A26 D38)' 
		+ '<Option value="1312">Road Rage (A55 D31)' 
		+ '<Option value="2134">Robot Bomb Defuser (A34 D65)' 
		+ '<Option value="2488">Rock Iguana (A79 D50)' 
		+ '<Option value="237">Roman Mace (A12 D28)' 
		+ '<Option value="307">Ru-357 Pistola (A26 D24)' 
		+ '<Option value="257">RU-44 SMG (A36 D20)' 
		+ '<Option value="600">Rusted Rebar (A28 D17)' 
		+ '<Option value="2138">Safety First (A65 D32)' 
		+ '<Option value="2458">Sand Goggles (A37 D74)' 
		+ '<Option value="2318">Sand Tiger (A31 D65)' 
		+ '<Option value="2331">Sandman Vest (A36 D65)' 
		+ '<Option value="152">Sawed-off Double Barrel Shotgun (A35 D15)' 
		+ '<Option value="165">Scalper\'s Hatchet (A25 D5)' 
		+ '<Option value="2485">Scythe Chariot (A80 D80)' 
		+ '<Option value="979">Set of 2 Candles (A40 D28)' 
		+ '<Option value="319">Set of Frankenstein Poker Chips (A22 D10)' 
		+ '<Option value="231">Set of Illegal Fireworks (A35 D12)' 
		+ '<Option value="540">Set of Love Birds (A26 D53)' 
		+ '<Option value="984">Set of Terrible Twos (A64 D40)' 
		+ '<Option value="525">Shaped Charge (A51 D25)' 
		+ '<Option value="1924">Shiner (A46 D74)' 
		+ '<Option value="33">Silenced Pistol (A18 D16)' 
		+ '<Option value="954">Silverback (A36 D68)' 
		+ '<Option value="683">Silverback Gorilla (A35 D57)' 
		+ '<Option value="989">Sin City Shooter (A81 D36)' 
		+ '<Option value="2091">SK 7 Shorty (A54 D34)' 
		+ '<Option value="652">Sled and Dogs (A53 D25)' 
		+ '<Option value="2330">Slicer Pistol (A73 D43)' 
		+ '<Option value="2154">Sloth (A65 D33)' 
		+ '<Option value="1920">Snarler (A68 D44)' 
		+ '<Option value="42">Sniper Rifle (A22 D21)' 
		+ '<Option value="971">Snow Crawler (A29 D47)' 
		+ '<Option value="1562">Snow Monster (A62 D30)' 
		+ '<Option value="255">Snub-Nose Revolver (A18 D16)' 
		+ '<Option value="291">Sodium Pentothal (A25 D4)' 
		+ '<Option value="899">Sonar Buoy (A37 D74)' 
		+ '<Option value="2448">Sonny\'s Suit (A42 D81)' 
		+ '<Option value="343">Spetsnaz Operative (A38 D32)' 
		+ '<Option value="727">Spy Plane (A31 D58)' 
		+ '<Option value="116">St. Patty\'s Shillelagh (A25 D25)' 
		+ '<Option value="87">St. Valentine\'s Shotgun (A24 D22)' 
		+ '<Option value="724">Stealth Car (A41 D23)' 
		+ '<Option value="452">Stock Car (A39 D22)' 
		+ '<Option value="2148">Stockholm Pro (A68 D40)' 
		+ '<Option value="393">Stolen Police Car (A21 D39)' 
		+ '<Option value="2146">Strike Breaker (A39 D69)' 
		+ '<Option value="357">Stuffed Turkey (A19 D25)' 
		+ '<Option value="85">Sub Machine Gun (A24 D22)' 
		+ '<Option value="2459">Sultan\'s Saber (A75 D37)' 
		+ '<Option value="2484">Sun Spider (A61 D85)' 
		+ '<Option value="947">Survival Canteen (A21 D41)' 
		+ '<Option value="952">Survival Pack (A48 D25)' 
		+ '<Option value="636">Suspicious Package (A30 D18)' 
		+ '<Option value="2127">Swamp Buggy (A72 D32)' 
		+ '<Option value="2124">Swamp Camo (A48 D27)' 
		+ '<Option value="206">SWAT Van (A7 D26)' 
		+ '<Option value="1552">Swiss Banker (A27 D54)' 
		+ '<Option value="215">Switchblade (A14 D16)' 
		+ '<Option value="297">Taino Vomit Stick (A36 D22)' 
		+ '<Option value="2353">Tax Collector (A52 D82)' 
		+ '<Option value="603">Taxi Cab (A37 D24)' 
		+ '<Option value="1541">Tea Leaf (A27 D51)' 
		+ '<Option value="505">Temple Guardian (A27 D45)' 
		+ '<Option value="949">Tent Peg and Hammer (A40 D24)' 
		+ '<Option value="1911">Terrapin Body Armor (A31 D63)' 
		+ '<Option value="1929">Thermobaric Hand Grenade (A81 D50)' 
		+ '<Option value="287">Tiger Tank (A18 D48)' 
		+ '<Option value="494">Titanium Keris Knife (A26 D15)' 
		+ '<Option value="651">Tony Montana Suit (A24 D52)' 
		+ '<Option value="2139">Top Heavy (A30 D59)' 
		+ '<Option value="2337">Tornado (A70 D39)' 
		+ '<Option value="2198">Transport Chopper (A69 D32)' 
		+ '<Option value="521">Trauma Chopper (A21 D34)' 
		+ '<Option value="2333">Tree Feller (A34 D68)' 
		+ '<Option value="146">Trench Knife (A16 D14)' 
		+ '<Option value="1315">Trio Incarnate (A84 D39)' 
		+ '<Option value="414">Trio Mesa (A16 D34)' 
		+ '<Option value="2340">Tsunami (A43 D81)' 
		+ '<Option value="1561">Tundra SMG (A37 D61)' 
		+ '<Option value="125">Type 100 SMG (A30 D10)' 
		+ '<Option value="993">Uncle Sam (A34 D61)' 
		+ '<Option value="2147">Union Leader (A67 D38)' 
		+ '<Option value="1309">Utility Vest (A26 D50)' 
		+ '<Option value="391">V8 (A13 D26)' 
		+ '<Option value="157">Veyron (A17 D24)' 
		+ '<Option value="689">Vicious Anaconda (A20 D42)' 
		+ '<Option value="692">Vicious Cobra (A30 D55)' 
		+ '<Option value="685">Vicious Hyena (A28 D29)' 
		+ '<Option value="690">Vicious Kodiak (A41 D24)' 
		+ '<Option value="686">Vicious Parrot (A18 D31)' 
		+ '<Option value="687">Vicious Scorpion (A34 D12)' 
		+ '<Option value="691">Vicious Tiger (A52 D34)' 
		+ '<Option value="688">Vicious Wolf (A39 D30)' 
		+ '<Option value="79">Violin Case Machine Gun (A23 D22)' 
		+ '<Option value="338">Vortex Ring Gun (A12 D33)' 
		+ '<Option value="139">VSK-94 Sniper Rifle (A28 D12)' 
		+ '<Option value="2354">W2 (A84 D53)' 
		+ '<Option value="401">Waffle Iron (A14 D23)' 
		+ '<Option value="556">Wagner KP8 (A51 D26)' 
		+ '<Option value="2317">Wake Breaker (A36 D72)' 
		+ '<Option value="2425">War Rhino (A72 D31)' 
		+ '<Option value="994">Washington\'s Sword (A24 D61)' 
		+ '<Option value="1303">Water Born Tank (A65 D33)' 
		+ '<Option value="951">Waterproof Poncho (A22 D47)' 
		+ '<Option value="895">Weight Vest (A34 D57)' 
		+ '<Option value="2126">Wetland Guide (A34 D71)' 
		+ '<Option value="2086">Wild Boar (A43 D43)' 
		+ '<Option value="1304">Wolf Pack (A66 D35)' 
		+ '<Option value="109">Wood Chipper (A33 D17)' 
		+ '<Option value="2155">Wrath (A35 D66)' 
		+ '<Option value="1564">WWI German Armor (A26 D57)' 
		+ '<Option value="1568">WWII M4 Sherman (A80 D41)' 
		+ '<Option value="459">YetiSkin Ghillie Suit (A26 D43)' 
		+ '<Option value="497">Yin Yang (A34 D17)' 
		+ '<Option value="289">Zeppelin (A18 D36)' 
		+ '<Option value="1308">Zipper S10 (A49 D29)';
	
// **** COMBINED LOOT ****
	
	var combined_loot = '<Option style="color:#33FF00;" value="QueueSet_2">-- COMBINED 130\< LOOT --'
		+ '<Option value="2485">Scythe Chariot (A80 D80)' 
		+ '<Option value="11061">Dapper Flapper (A96 D63)' 
		+ '<Option value="2480">Anubian Cultist (A76 D76)' 
		+ '<Option value="2794">Strong Arm (A84 D68)' 
		+ '<Option value="11057">Sugar Daddy (A91 D61)' 
		+ '<Option value="2795">Stout Shoulders (A65 D85)' 
		+ '<Option value="2714">Orangutan (A82 D68)' 
		+ '<Option value="2801">Wasper Knife (A85 D65)' 
		+ '<Option value="2789">Wildebeest (A85 D64)' 
		+ '<Option value="2361">Iron And Silk (A74 D73)' 
		+ '<Option value="2713">Zorse (A81 D66)' 
		+ '<Option value="7058">Chance (A85 D62)' 
		+ '<Option value="2484">Sun Spider (A61 D85)' 
		+ '<Option value="2807">Extended Cab 640 (A62 D84)' 
		+ '<Option value="2788">Snow Monkey (A62 D83)' 
		+ '<Option value="1779">Tlingit Parka (A64 D81)' 
		+ '<Option value="2793">Five Finger Fortification (A65 D80)' 
		+ '<Option value="8181">Getaway Cruiser (A61 D83)' 
		+ '<Option value="1769">Juggernaut (A65 D79)' 
		+ '<Option value="2806">Sportster (A82 D62)' 
		+ '<Option value="5701">Smuggler\'s Sub (A86 D58)' 
		+ '<Option value="11064">Schooner (A55 D88)' 
		+ '<Option value="2700">Curragh (A60 D83)' 
		+ '<Option value="2710">Deimos Dagger (A78 D65)' 
		+ '<Option value="1038">Black Irish (A84 D59)' 
		+ '<Option value="969">Silk Thunder (A84 D59)' 
		+ '<Option value="5682">Jungle Hacker (A57 D85)' 
		+ '<Option value="2787">Raccoon (A60 D82)' 
		+ '<Option value="1772">Pisces Harpoon Gun (A64 D78)' 
		+ '<Option value="1776">Sheet Metal Blade (A79 D63)' 
		+ '<Option value="1771">King Cobra (A80 D62)' 
		+ '<Option value="7052">Gungnir (A82 D60)' 
		+ '<Option value="11060">Smoke Eater (A86 D56)' 
		+ '<Option value="2712">Mud Crawler (A60 D81)' 
		+ '<Option value="2711">Leg Up (A80 D61)' 
		+ '<Option value="8028">Ebon Severer (A56 D84)' 
		+ '<Option value="2489">Gopher ATV (A59 D81)' 
		+ '<Option value="2805">Day Rider 2K (A60 D80)' 
		+ '<Option value="8027">Army Cargo Carrier (A83 D57)' 
		+ '<Option value="2476">Reaction Contraption (A85 D55)' 
		+ '<Option value="2799">Hack Blade (A60 D79)' 
		+ '<Option value="5618">Northern Pike (A83 D56)' 
		+ '<Option value="1858">Canadian Lynx (A54 D84)' 
		+ '<Option value="5389">Pack Hunter (A58 D80)' 
		+ '<Option value="855">ET Hybrid (A63 D75)' 
		+ '<Option value="2792">Spotted Vest (A79 D59)' 
		+ '<Option value="2800">Pair of Stun Knuckles (A83 D55)' 
		+ '<Option value="8104">Man Eating Plant (A84 D54)' 
		+ '<Option value="857">Shadow Transporter (A77 D60)' 
		+ '<Option value="2786">Malayan Tiger (A79 D58)' 
		+ '<Option value="11056">Sinker (A83 D54)' 
		+ '<Option value="2354">W2 (A84 D53)' 
		+ '<Option value="5619">North American Porcupine (A51 D85)' 
		+ '<Option value="1997">Climber Leggings (A50 D85)' 
		+ '<Option value="2791">Desert Eyes (A58 D77)' 
		+ '<Option value="1119">Stout Shoulders (A58 D77)' 
		+ '<Option value="7025">Cape Buffalo (A76 D59)' 
		+ '<Option value="1930">Hammer Hawk (A52 D82)' 
		+ '<Option value="2353">Tax Collector (A52 D82)' 
		+ '<Option value="853">Mobile Garage (A55 D79)' 
		+ '<Option value="7028">Tundra Commmando (A55 D79)' 
		+ '<Option value="5408">Master (A58 D76)' 
		+ '<Option value="2784">Warthog (A74 D60)' 
		+ '<Option value="2696">Gaelic Crossbow (A79 D55)' 
		+ '<Option value="8103">Man Eating Plant (A83 D51)' 
		+ '<Option value="1864">Perini-R (A49 D84)' 
		+ '<Option value="2451">Miami Vice (A51 D82)' 
		+ '<Option value="2797">Dirty Trick (A57 D76)' 
		+ '<Option value="2490">Hellcat Cannon (A78 D55)' 
		+ '<Option value="5374">Wendigo (A83 D50)' 
		+ '<Option value="2473">Mechanized Crocodilian (A84 D49)' 
		+ '<Option value="1820">Sports Fanatic (A84 D49)' 
		+ '<Option value="7034">Blizzard Cannon (A48 D84)' 
		+ '<Option value="1928">Flame-Resistant Suit (A53 D79)' 
		+ '<Option value="2785">Coconut Crab (A56 D76)' 
		+ '<Option value="1528">Royal Thai Police Tank (A58 D74)' 
		+ '<Option value="5349">Roman Legion (A74 D58)' 
		+ '<Option value="5284">Brigadier (A80 D52)' 
		+ '<Option value="2352">Lamprey Eel (A81 D51)' 
		+ '<Option value="7031">Savannah Patroller (A82 D50)' 
		+ '<Option value="5411">Mugger Crocodile (A46 D85)' 
		+ '<Option value="2482">Amenhoteps Khopesh (A49 D82)' 
		+ '<Option value="2446">Falling Leaves (A50 D81)' 
		+ '<Option value="2804">Hunter \'Spy\' XS (A76 D55)' 
		+ '<Option value="1929">Thermobaric Hand Grenade (A81 D50)' 
		+ '<Option value="1872">Flanger (A83 D48)' 
		+ '<Option value="8084">Mamacita (A84 D47)' 
		+ '<Option value="2936">Cab Driver (A45 D85)' 
		+ '<Option value="2692">Irish Elk (A54 D76)' 
		+ '<Option value="2790">Power Armor (A55 D75)' 
		+ '<Option value="2798">Electric Prod (A78 D52)' 
		+ '<Option value="11062">Boby Grand (A80 D50)' 
		+ '<Option value="5626">Rainbow Boa (A80 D50)'; 
		
	// **** A-Z Loot ****
	
	var AZ_loot = '<Option style="color:#33FF00;" value="QueueSet_2">-- A-Z LOOT --'
		+ '<Option value="1">.22 Pistol (A2 D0)' 
		+ '<Option value="112">.22 Pistol +3 (A5 D3)' 
		+ '<Option value="132">.45 ACP Pistol (A18 D12)' 
		+ '<Option value="110">.45 Cal Pistol +1 (A3 D3)' 
		+ '<Option value="5">.45 Revolver (A3 D2)' 
		+ '<Option value="41">.50 Cal Pistol (A22 D21)' 
		+ '<Option value="15">.50 Caliber Rifle (A16 D11)' 
		+ '<Option value="169">10 Gallon Hat (A13 D27)' 
		+ '<Option value="1805">12 Gauge (A35 D51)' 
		+ '<Option value="703">1955 Monique (A14 D22)' 
		+ '<Option value="985">2 Big 2 Fail (A61 D29)' 
		+ '<Option value="719">22LR (A46 D28)' 
		+ '<Option value="2057">24k Chainsaw (A29 D15)' 
		+ '<Option value="145">\'35 Cabriolet (A10 D20)' 
		+ '<Option value="1900">40 Caliber Defender (A43 D25)' 
		+ '<Option value="212">9mm Auto Pistol (A40 D10)' 
		+ '<Option value="1922">9mm Fury (A72 D49)' 
		+ '<Option value="4">9mm Semi-Automatic (A3 D2)' 
		+ '<Option value="576">Ace in the Sleeve (A53 D23)' 
		+ '<Option value="535">Acetylene Torch (A0 D0)' 
		+ '<Option value="779">African Elephant (A61 D37)' 
		+ '<Option value="684">African Lion (A58 D36)' 
		+ '<Option value="2463">Agave (A78 D42)' 
		+ '<Option value="386">Agent Purvis\' Rifle (A44 D29)' 
		+ '<Option value="202">Aguila HV .50 Sniper Rifle (A40 D16)' 
		+ '<Option value="279">Airboat (A16 D37)' 
		+ '<Option value="1306">Aircraft Carrier (A80 D38)' 
		+ '<Option value="52">AK-47 (A22 D21)' 
		+ '<Option value="2027">Alarm Code (A0 D0)' 
		+ '<Option value="2067">All Terrain (A19 D27)' 
		+ '<Option value="456">Alley Apple (A21 D15)' 
		+ '<Option value="706">Alligator (A27 D48)' 
		+ '<Option value="905">Alpine (A35 D57)' 
		+ '<Option value="1783">Aluminum Bat (A67 D26)' 
		+ '<Option value="1794">Aluminum Bat (A71 D30)' 
		+ '<Option value="1795">Aluminum Bat (A75 D33)' 
		+ '<Option value="5502">Amazon River Guide (A30 D16)' 
		+ '<Option value="2482">Amenhoteps Khopesh (A49 D82)' 
		+ '<Option value="2481">Amon Ra\'s Barge (A82 D45)' 
		+ '<Option value="1553">Amphibian (A34 D57)' 
		+ '<Option value="2170">Amphiquad (A58 D24)' 
		+ '<Option value="852">Amplitude (A65 D39)' 
		+ '<Option value="1937">Amur Leopard (A69 D34)' 
		+ '<Option value="1760">Amur River Boat (A69 D50)' 
		+ '<Option value="460">Anaconda (A42 D23)' 
		+ '<Option value="632">Andresen 420si (A41 D43)' 
		+ '<Option value="5324">Angelo Della Morte (A35 D56)' 
		+ '<Option value="4603">Animal Feed (A0 D0)' 
		+ '<Option value="2435">Antidote (A65 D34)' 
		+ '<Option value="2642">Antiproiettil (A66 D52)' 
		+ '<Option value="2480">Anubian Cultist (A76 D76)' 
		+ '<Option value="2185">Anvil (A0 D0)' 
		+ '<Option value="5365">Apprentice (A29 D47)' 
		+ '<Option value="4605">Aquarium (A0 D0)' 
		+ '<Option value="900">Aquatic Rifle (A75 D41)' 
		+ '<Option value="745">Arabian Leopard (A20 D16)' 
		+ '<Option value="7030">Arachnid Cruiser (A65 D25)' 
		+ '<Option value="260">Arana Net Gun (A16 D40)' 
		+ '<Option value="2143">Arbitrator (A67 D35)' 
		+ '<Option value="656">Arc Welder (A0 D0)' 
		+ '<Option value="1800">Arctic Wolf (A31 D58)' 
		+ '<Option value="2159">Arcturion Assault Rifle (A59 D27)' 
		+ '<Option value="776">Ares (A59 D36)' 
		+ '<Option value="2164">Ares Power Armor (A33 D58)' 
		+ '<Option value="1028">Arkticheskij Gus\' (A22 D42)' 
		+ '<Option value="2105">Arm Guard (A27 D48)' 
		+ '<Option value="1041">Arma Di Ordinanza (A21 D32)' 
		+ '<Option value="619">Armadillo Gear (A24 D53)' 
		+ '<Option value="5344">Armatura Motocicletta (A40 D66)' 
		+ '<Option value="5345">Armatura Ramarro (A65 D45)' 
		+ '<Option value="544">Armed Doorman (A51 D24)' 
		+ '<Option value="1310">Armed Drone (A51 D27)' 
		+ '<Option value="45">Armed Guard (A8 D25)' 
		+ '<Option value="2195">Armor Part (A0 D0)' 
		+ '<Option value="2103">Armor Piercing K-28 (A26 D54)' 
		+ '<Option value="1014">Armored Briefcase (A25 D36)' 
		+ '<Option value="16">Armored Car (A14 D15)' 
		+ '<Option value="183">Armored State Car (A30 D42)' 
		+ '<Option value="11">Armored Truck (A4 D8)' 
		+ '<Option value="1927">Army Ants (A77 D51)' 
		+ '<Option value="8027">Army Cargo Carrier (A83 D57)' 
		+ '<Option value="5325">Arrivederci 20 (A55 D41)' 
		+ '<Option value="3523">Art Gamer (A0 D0)' 
		+ '<Option value="201">ASC45 "Conquistador" (A36 D18)' 
		+ '<Option value="2455">Ascension (A29 D57)' 
		+ '<Option value="5326">Asconini 33 (A38 D61)' 
		+ '<Option value="1062">Asino (A27 D38)' 
		+ '<Option value="1300">Assault Trooper (A22 D35)' 
		+ '<Option value="2437">Astro Cruise (A77 D38)' 
		+ '<Option value="1500">Attack Cobra (A24 D20)' 
		+ '<Option value="155">ATV (A18 D32)' 
		+ '<Option value="1540">Auto Caliber (A52 D21)' 
		+ '<Option value="1134">Autoboatome (A33 D71)' 
		+ '<Option value="9">Automatic Rifle (A4 D4)' 
		+ '<Option value="2444">Autumn Camo (A43 D78)' 
		+ '<Option value="2445">Autumn Harvester (A80 D41)' 
		+ '<Option value="2335">Avalanche (A32 D67)' 
		+ '<Option value="1059">Avanti Tutta (A44 D56)' 
		+ '<Option value="191">Avispa Machine Gun (A54 D24)' 
		+ '<Option value="106">Axe (A21 D9)' 
		+ '<Option value="827">Azazel\'s Sword (A62 D37)' 
		+ '<Option value="1554">Aztec (A51 D26)' 
		+ '<Option value="1565">B-52 Bomber (A59 D27)' 
		+ '<Option value="73">BA-12 Assault Rifle (A32 D10)' 
		+ '<Option value="270">Baby Face Nelson\'s .351 (A21 D24)' 
		+ '<Option value="676">Backdoor (A21 D53)' 
		+ '<Option value="3008">Bad Habit (A46 D78)' 
		+ '<Option value="693">Bad Hair Day (A13 D23)' 
		+ '<Option value="746">Badger (A17 D19)' 
		+ '<Option value="426">Bag of Economy Pack of Socks (A10 D20)' 
		+ '<Option value="302">Ballesta de Muneca (A40 D20)' 
		+ '<Option value="2169">Ballista Missile Launcher (A62 D15)' 
		+ '<Option value="2149">Ballistic Helmet (A35 D72)' 
		+ '<Option value="1002">Ballistic Knife (A20 D28)' 
		+ '<Option value="333">Balloon Boy (A10 D28)' 
		+ '<Option value="2115">Bambaiyya Rajah (A60 D55)' 
		+ '<Option value="5505">Banana Slugger (A19 D37)' 
		+ '<Option value="211">Bandanna (A11 D19)' 
		+ '<Option value="1012">Bank Guard Uniform (A0 D0)' 
		+ '<Option value="621">Barbwire Bat (A21 D16)' 
		+ '<Option value="2073">Bark Scorpion (A50 D32)' 
		+ '<Option value="890">Barracuda (A31 D59)' 
		+ '<Option value="1009">Barsuk SUV (A36 D52)' 
		+ '<Option value="11094">Bat-Eared Fox (A55 D81)' 
		+ '<Option value="520">Battering Ram (A28 D14)' 
		+ '<Option value="223">Bayonet (A4 D16)' 
		+ '<Option value="1761">Bayou Trike (A61 D48)' 
		+ '<Option value="513">Be Mine (A20 D14)' 
		+ '<Option value="2665">Bear-Proof Suit (A55 D65)' 
		+ '<Option value="5313">Bearskin Cloak (A30 D72)' 
		+ '<Option value="1582">Bellhop (A0 D0)' 
		+ '<Option value="1981">Belt Buckler (A46 D70)' 
		+ '<Option value="2010">Belt Fed Shotgun (A27 D36)' 
		+ '<Option value="7038">Beluga (A69 D45)' 
		+ '<Option value="1855">Bench Rifle (A52 D30)' 
		+ '<Option value="2350">Benny Blanco (A78 D50)' 
		+ '<Option value="431">Best Friend (A23 D40)' 
		+ '<Option value="695">Bicycle Chain (A22 D15)' 
		+ '<Option value="2080">Big 66 (A19 D23)' 
		+ '<Option value="980">Big Apple (A46 D33)' 
		+ '<Option value="675">Big Bad Wolf (A42 D25)' 
		+ '<Option value="760">Big Blind (A52 D25)' 
		+ '<Option value="5501">Big Bounty (A37 D20)' 
		+ '<Option value="4606">Big Cage (A0 D0)' 
		+ '<Option value="5311">Big Horn Sheep (A30 D72)' 
		+ '<Option value="249">Bigg\'s Rig (A13 D18)' 
		+ '<Option value="2172">Bighorn (A26 D64)' 
		+ '<Option value="2074">Bighorn Ram (A37 D42)' 
		+ '<Option value="2011">Biohazard (A18 D28)' 
		+ '<Option value="2194">Bio-Monitor (A0 D0)' 
		+ '<Option value="4607">Bird Cage (A0 D0)' 
		+ '<Option value="548">Bird of Prey (A29 D50)' 
		+ '<Option value="4476">Bisect (A40 D72)' 
		+ '<Option value="2072">Bison (A23 D40)' 
		+ '<Option value="4413">Black Backed Jackal (A76 D42)' 
		+ '<Option value="2409">Black Bear (A75 D34)' 
		+ '<Option value="2439">Black Friday Mask (A79 D44)' 
		+ '<Option value="1038">Black Irish (A84 D59)' 
		+ '<Option value="542">Black Widow (A28 D51)' 
		+ '<Option value="5623">Blackmail Light (A40 D76)' 
		+ '<Option value="4557">Blazing Santoku (A35 D18)' 
		+ '<Option value="397">Blitzen (A16 D21)' 
		+ '<Option value="7034">Blizzard Cannon (A48 D84)' 
		+ '<Option value="998">Blockade Auto Shotgun (A58 D45)' 
		+ '<Option value="549">Blood Rain (A30 D51)' 
		+ '<Option value="35">Bloody Chainsaw (A18 D16)' 
		+ '<Option value="36">Bloody Horse Head (A18 D16)' 
		+ '<Option value="159">Bloody Mop (A18 D14)' 
		+ '<Option value="158">Bloody Webby (A22 D15)' 
		+ '<Option value="149">Blowgun (A22 D8)' 
		+ '<Option value="2144">Blue Collar (A37 D68)' 
		+ '<Option value="4454">Blue Dragon Helm (A75 D52)' 
		+ '<Option value="3522">Blue Eyed Nate (A0 D0)' 
		+ '<Option value="4403">Blue Sky 55 (A25 D50)' 
		+ '<Option value="298">Blunderbuss (A27 D7)' 
		+ '<Option value="424">Bobble Head (A13 D23)' 
		+ '<Option value="4596">Bobcat (A42 D49)' 
		+ '<Option value="440">Bobsled (A15 D24)' 
		+ '<Option value="11062">Boby Grand (A80 D50)' 
		+ '<Option value="57">Body Double (A10 D25)' 
		+ '<Option value="18">Bodyguard (A8 D25)' 
		+ '<Option value="2643">Bolla (A68 D55)' 
		+ '<Option value="2116">Bollywood Superhit (A47 D81)' 
		+ '<Option value="1700">Bolo Knife (A65 D27)' 
		+ '<Option value="2089">Bomb Helmet (A32 D52)' 
		+ '<Option value="1809">Bomb Suit (A22 D52)' 
		+ '<Option value="2209">Bone Carved Pistol (A49 D26)' 
		+ '<Option value="2344">Bone Cycle (A39 D76)' 
		+ '<Option value="273">Bonnie & Clyde\'s B-400 (A32 D19)' 
		+ '<Option value="71">Bookie\'s Holdout Pistol (A24 D12)' 
		+ '<Option value="672">Boomerang (A0 D0)' 
		+ '<Option value="141">Boomslang ACR (A27 D16)' 
		+ '<Option value="721">Boot Knife (A15 D33)' 
		+ '<Option value="1523">Bosozoku Convertible (A29 D15)' 
		+ '<Option value="1004">Boss Karpov\'s Pistol (A50 D38)' 
		+ '<Option value="773">Boulder Breaker (A37 D73)' 
		+ '<Option value="2501">Bowie Knife (A31 D58)' 
		+ '<Option value="1903">Box Jellyfish (A28 D56)' 
		+ '<Option value="515">Box of Rotten Chocolates (A21 D14)' 
		+ '<Option value="1756">Brawler\'s Headguard (A35 D65)' 
		+ '<Option value="232">Brickbat (A18 D12)' 
		+ '<Option value="5284">Brigadier (A80 D52)' 
		+ '<Option value="1571">British Officer\'s Sword (A20 D10)' 
		+ '<Option value="1509">BRM-38 (A23 D38)' 
		+ '<Option value="216">Broken Bottle (A21 D9)' 
		+ '<Option value="3005">Brown Cancer Crab (A52 D75)' 
		+ '<Option value="1917">Brown Pelican (A35 D64)' 
		+ '<Option value="5369">Brown Rat (A68 D45)' 
		+ '<Option value="12000">Brownie (A45 D71)' 
		+ '<Option value="747">Buffalo (A25 D12)' 
		+ '<Option value="405">Bugged Cell Phone (A19 D19)' 
		+ '<Option value="1944">Bullet Proof Heart (A42 D67)' 
		+ '<Option value="570">Bulletproof Glass (A0 D0)' 
		+ '<Option value="58">Bulletproof Trenchcoat (A10 D25)' 
		+ '<Option value="2125">Bullfrog (A29 D49)' 
		+ '<Option value="2">Butterfly Knife (A2 D1)' 
		+ '<Option value="2097">Buzzard Combat Chopper (A54 D30)' 
		+ '<Option value="657">Buzzsaw (A0 D0)' 
		+ '<Option value="2092">Buzzsaw (A55 D35)' 
		+ '<Option value="7">C4 (A5 D2)' 
		+ '<Option value="314">CA-10 TMP (A18 D24)' 
		+ '<Option value="2936">Cab Driver (A45 D85)' 
		+ '<Option value="1763">California Condor (A42 D62)' 
		+ '<Option value="5368">California Moray (A42 D65)' 
		+ '<Option value="11093">Camo Ammo Belt (A82 D50)' 
		+ '<Option value="901">Camo Riot Gear (A56 D26)' 
		+ '<Option value="205">Camouflage Body Armor (A18 D34)' 
		+ '<Option value="1858">Canadian Lynx (A54 D84)' 
		+ '<Option value="439">Candy Cane (A20 D12)' 
		+ '<Option value="308">Cane Cutter (A35 D5)' 
		+ '<Option value="198">Cane Knife (A18 D28)' 
		+ '<Option value="39">Canister Bomb (A18 D16)' 
		+ '<Option value="229">Cannon (A33 D7)' 
		+ '<Option value="261">Canonazo (A42 D22)' 
		+ '<Option value="7025">Cape Buffalo (A76 D59)' 
		+ '<Option value="274">Capone\'s Armored 341A (A14 D42)' 
		+ '<Option value="2199">Car Cutter (A35 D62)' 
		+ '<Option value="534">Car Lift (A0 D0)' 
		+ '<Option value="558">Car Part (A0 D0)' 
		+ '<Option value="5511">Caracara (A22 D44)' 
		+ '<Option value="4457">Carapace Jacket (A48 D76)' 
		+ '<Option value="342">Cargo Ship (A15 D46)' 
		+ '<Option value="2351">Carlito\'s Jacket (A33 D79)' 
		+ '<Option value="2348">Carlito\'s Way (A76 D44)' 
		+ '<Option value="250">Carmine\'s Lucky Lapel Pin (A34 D11)' 
		+ '<Option value="303">Carnivore Urban Shotgun (A25 D14)' 
		+ '<Option value="11052">Carpenter Nails (A0 D0)' 
		+ '<Option value="5283">Carry All Defense Vest (A27 D57)' 
		+ '<Option value="2056">Carver (A24 D16)' 
		+ '<Option value="1579">Casino Dealer (A0 D0)' 
		+ '<Option value="758">Casino Guard (A48 D28)' 
		+ '<Option value="749">Cassowary (A18 D18)' 
		+ '<Option value="1705">Cataclysmic (A53 D26)' 
		+ '<Option value="5507">Cat\'s Claw (A35 D20)' 
		+ '<Option value="2436">Cat\'s Eye Hand Axe (A35 D71)' 
		+ '<Option value="38">Cattle Prod (A18 D16)' 
		+ '<Option value="1056">Cavalletta (A43 D26)' 
		+ '<Option value="263">Cazador Assault Rifle (A60 D25)' 
		+ '<Option value="532">Cement Block (A0 D0)' 
		+ '<Option value="831">Cerebro (A63 D37)' 
		+ '<Option value="1550">Chain Viper (A46 D33)' 
		+ '<Option value="24">Chainsaw (A18 D12)' 
		+ '<Option value="702">Champagne Shiv (A20 D11)' 
		+ '<Option value="7058">Chance (A85 D62)' 
		+ '<Option value="241">Chariot (A48 D12)' 
		+ '<Option value="1910">Charleston Classic (A56 D26)' 
		+ '<Option value="679">Charm 84 MH (A20 D13)' 
		+ '<Option value="1580">Chef (A0 D0)' 
		+ '<Option value="464">Chemical Gas Mask (A29 D48)' 
		+ '<Option value="1007">Cherepakha Compact (A18 D25)' 
		+ '<Option value="415">Cherry Picker (A36 D13)' 
		+ '<Option value="192">Che\'s Beret (A46 D34)' 
		+ '<Option value="451">Chest Protector (A22 D36)' 
		+ '<Option value="340">Chevalier Exoskeleton (A18 D43)' 
		+ '<Option value="7043">Chianina Taurus Bull (A69 D43)' 
		+ '<Option value="5279">Chimney Sweep (A67 D32)' 
		+ '<Option value="1302">Chimpanzee (A31 D59)' 
		+ '<Option value="507">Chinese Tiger (A26 D48)' 
		+ '<Option value="5314">Chisel Plow ATV (A30 D72)' 
		+ '<Option value="253">Chlori-tek GDS (A22 D33)' 
		+ '<Option value="5504">Chomper (A39 D19)' 
		+ '<Option value="2440">Chomps (A80 D37)' 
		+ '<Option value="983">Chop Suey Chaser (A37 D65)' 
		+ '<Option value="67">Chopper (A18 D6)' 
		+ '<Option value="12001">Christmas Cupcakes (A71 D45)' 
		+ '<Option value="2441">Christy (A39 D81)' 
		+ '<Option value="115">Chrome Skyline (A12 D18)' 
		+ '<Option value="176">Chucho FAV (A25 D20)' 
		+ '<Option value="1725">Chudnovsky\'s Gas Mask (A20 D32)' 
		+ '<Option value="179">Cigarette Boat (A25 D27)' 
		+ '<Option value="1575">Cinder Block (A0 D0)' 
		+ '<Option value="1068">Cinghiale (A45 D50)' 
		+ '<Option value="2135">Cinnabar P70 (A58 D28)' 
		+ '<Option value="604">City Inspector\'s Uniform (A30 D37)' 
		+ '<Option value="2021">Classic Convertible (A30 D35)' 
		+ '<Option value="103">Claw Hammer (A20 D10)' 
		+ '<Option value="264">Claymore (A19 D10)' 
		+ '<Option value="2424">Clear Path (A71 D33)' 
		+ '<Option value="1505">Cleaver (A25 D44)' 
		+ '<Option value="1997">Climber Leggings (A50 D85)' 
		+ '<Option value="1921">Climbing Claws (A71 D45)' 
		+ '<Option value="2163">Climbing Gear (A18 D33)' 
		+ '<Option value="2102">Clipper (A45 D24)' 
		+ '<Option value="2474">Clockwork Beetle (A42 D81)' 
		+ '<Option value="2077">Club Owner (A16 D23)' 
		+ '<Option value="310">CM Dragon (A40 D18)' 
		+ '<Option value="2084">CM Hatchback (A41 D41)' 
		+ '<Option value="563">CM Santiago R10 (A42 D30)' 
		+ '<Option value="1811">Cobra G7 (A53 D25)' 
		+ '<Option value="2639">Coccodrillo (A57 D40)' 
		+ '<Option value="193">Cocodrilo APC (A42 D56)' 
		+ '<Option value="2785">Coconut Crab (A56 D76)' 
		+ '<Option value="1110">Coconut Crab (A46 D60)' 
		+ '<Option value="2429">Cocoon Riot Shield (A50 D26)' 
		+ '<Option value="733">Coilgun (A23 D11)' 
		+ '<Option value="1919">Cold Embrace (A67 D47)' 
		+ '<Option value="5399">Cold Snap (A43 D31)' 
		+ '<Option value="218">Colombian Necktie (A8 D22)' 
		+ '<Option value="964">Combat Chopper (A44 D36)' 
		+ '<Option value="718">Combat Helmet (A22 D46)' 
		+ '<Option value="43">Combat Knife (A22 D21)' 
		+ '<Option value="2145">Company Car (A68 D33)' 
		+ '<Option value="151">Compound Bow (A27 D13)' 
		+ '<Option value="869">Compression (A80 D37)' 
		+ '<Option value="63">Computer Set-Up (A0 D0)' 
		+ '<Option value="726">Con Man (A60 D35)' 
		+ '<Option value="62">Concealable Camera (A0 D0)' 
		+ '<Option value="723">Concealed Armor (A22 D40)' 
		+ '<Option value="2638">Conchiglia (A35 D55)' 
		+ '<Option value="1577">Concrete (A0 D0)' 
		+ '<Option value="1814">Condor (A37 D50)' 
		+ '<Option value="1578">Construction Tool (A0 D0)' 
		+ '<Option value="2426">Containment (A35 D72)' 
		+ '<Option value="1711">Contender (A33 D63)' 
		+ '<Option value="356">Cooked Goose (A15 D27)' 
		+ '<Option value="2166">Cooling Vest (A31 D61)' 
		+ '<Option value="207">COP357 (A32 D9)' 
		+ '<Option value="4463">Copperhead (A75 D49)' 
		+ '<Option value="453">Corkscrew (A33 D22)' 
		+ '<Option value="1788">Cormorant (A29 D71)' 
		+ '<Option value="1866">Cormorant (A32 D75)' 
		+ '<Option value="1867">Cormorant (A35 D79)' 
		+ '<Option value="1053">Corpo Armatura (A63 D31)' 
		+ '<Option value="1023">Cossack Armored Vest (A18 D48)' 
		+ '<Option value="1313">Cottonmouth (A27 D54)' 
		+ '<Option value="2122">Cottonmouth Blade (A43 D23)' 
		+ '<Option value="1816">Cougar (A51 D32)' 
		+ '<Option value="879">Coyote (A37 D64)' 
		+ '<Option value="5627">Crab Claw Cutter (A81 D37)' 
		+ '<Option value="5612">Crab Shell Vest (A67 D48)' 
		+ '<Option value="430">Crazy Dragon (A41 D17)' 
		+ '<Option value="448">Cricket Bat (A29 D21)' 
		+ '<Option value="2120">Croc Catcher (A41 D24)' 
		+ '<Option value="5410">Croc O\'Nine Tails (A52 D73)' 
		+ '<Option value="547">Crop Duster (A52 D28)' 
		+ '<Option value="5289">Crystalline (A73 D35)' 
		+ '<Option value="559">Cuban Car Part (A0 D0)' 
		+ '<Option value="1321">Cuban Mercenary (A0 D0)' 
		+ '<Option value="977">Cuban Underground (A29 D40)' 
		+ '<Option value="503">Cue Ball (A19 D16)' 
		+ '<Option value="516">Cupid (A46 D27)' 
		+ '<Option value="508">Cupid\'s Arrow (A37 D27)' 
		+ '<Option value="506">Cupid\'s Hit Squad (A47 D22)' 
		+ '<Option value="88">Cupid\'s Tommy Gun (A24 D22)' 
		+ '<Option value="278">Curare Gun (A40 D12)' 
		+ '<Option value="1764">Curled Horn Helm (A71 D51)' 
		+ '<Option value="2700">Curragh (A60 D83)' 
		+ '<Option value="873">D-07 Proximity Mine (A70 D39)' 
		+ '<Option value="1825">Daddy\'O (A29 D60)' 
		+ '<Option value="498">Daisho (A31 D20)' 
		+ '<Option value="11061">Dapper Flapper (A96 D63)' 
		+ '<Option value="2201">Dark Squad Vest (A35 D65)' 
		+ '<Option value="225">Davy Crockett Hat (A21 D9)' 
		+ '<Option value="1836">Day Rider 2K (A45 D50)' 
		+ '<Option value="2805">Day Rider 2K (A60 D80)' 
		+ '<Option value="320">Dead End (A32 D20)' 
		+ '<Option value="618">Dead Ringer (A45 D36)' 
		+ '<Option value="484">Deadly Armed Guard (A12 D28)' 
		+ '<Option value="483">Deadly Body Double (A25 D45)' 
		+ '<Option value="470">Deadly Boomslang ACR (A45 D20)' 
		+ '<Option value="488">Deadly Bullet-Proof Berkshire (A20 D36)' 
		+ '<Option value="478">Deadly Car Bomb (A42 D36)' 
		+ '<Option value="477">Deadly Cattle Prod (A14 D26)' 
		+ '<Option value="489">Deadly Chrome Skyline (A35 D22)' 
		+ '<Option value="481">Deadly Combat Knife (A27 D21)' 
		+ '<Option value="474">Deadly COP357 (A47 D25)' 
		+ '<Option value="487">Deadly Dragon Skin Body Armor (A19 D36)' 
		+ '<Option value="473">Deadly Flamethrower (A35 D24)' 
		+ '<Option value="485">Deadly Gas Mask (A16 D26)' 
		+ '<Option value="492">Deadly Giavellotto (A30 D33)' 
		+ '<Option value="469">Deadly Gold Crowbar (A27 D23)' 
		+ '<Option value="490">Deadly Gold GX9 (A46 D30)' 
		+ '<Option value="491">Deadly Impression (A28 D47)' 
		+ '<Option value="482">Deadly Jetpack Prototype (A46 D15)' 
		+ '<Option value="472">Deadly Light Anti Tank Weapon (A33 D22)' 
		+ '<Option value="479">Deadly M32 Grenade Launcher (A44 D20)' 
		+ '<Option value="476">Deadly M468 Assault Rifle (A36 D20)' 
		+ '<Option value="480">Deadly Meat Hook (A28 D23)' 
		+ '<Option value="475">Deadly Piano Wire (A32 D16)' 
		+ '<Option value="486">Deadly Riot Gear (A20 D35)' 
		+ '<Option value="493">Deadly SWAT Van (A18 D28)' 
		+ '<Option value="471">Deadly AA-12 Auto Shotgun (A34 D18)' 
		+ '<Option value="648">Deal Gone Bad (A51 D33)' 
		+ '<Option value="711">Death Dealer Minigun (A48 D64)' 
		+ '<Option value="884">Death\'s Door (A57 D27)' 
		+ '<Option value="219">Decommissioned APC (A18 D37)' 
		+ '<Option value="421">Decorated Tree (A4 D26)' 
		+ '<Option value="845">Deer Hunter (A51 D44)' 
		+ '<Option value="2088">Defender Armored Car (A31 D50)' 
		+ '<Option value="5621">Deft Touch (A73 D44)' 
		+ '<Option value="2710">Deimos Dagger (A78 D65)' 
		+ '<Option value="606">Demolition Kit (A53 D38)' 
		+ '<Option value="395">Dentist\'s Drill (A21 D11)' 
		+ '<Option value="764">Deposit Box (A0 D0)' 
		+ '<Option value="640">Depth Charge (A23 D40)' 
		+ '<Option value="2791">Desert Eyes (A58 D77)' 
		+ '<Option value="1115">Desert Eyes (A48 D59)' 
		+ '<Option value="2430">Desert Haze (A28 D52)' 
		+ '<Option value="2460">Desert Lynx (A75 D36)' 
		+ '<Option value="1566">Desert Storm G2 (A57 D27)' 
		+ '<Option value="1807">Devastator (A52 D36)' 
		+ '<Option value="2646">Devil Costume (A55 D27)' 
		+ '<Option value="2076">Diamondback (A56 D48)' 
		+ '<Option value="1046">Diavolo Piccolo SMG (A56 D28)' 
		+ '<Option value="392">Dillinger\'s Overcoat (A22 D40)' 
		+ '<Option value="385">Dillinger\'s Pistols and Holster (A36 D18)' 
		+ '<Option value="275">Dillinger\'s Wooden Gun (A12 D45)' 
		+ '<Option value="748">Dingo (A13 D24)' 
		+ '<Option value="1521">Dirt Bike (A24 D14)' 
		+ '<Option value="258">Dirty Syringe (A23 D5)' 
		+ '<Option value="2325">Dirty Trick (A45 D49)' 
		+ '<Option value="2797">Dirty Trick (A57 D76)' 
		+ '<Option value="896">Dive Scooter (A27 D59)' 
		+ '<Option value="897">Diver\'s Knife (A60 D33)' 
		+ '<Option value="893">Diving Gear (A56 D26)' 
		+ '<Option value="2096">Domestic Defense (A53 D35)' 
		+ '<Option value="1719">Don Romo\'s Pride (A35 D72)' 
		+ '<Option value="2345">Doom Gauntlet (A76 D41)' 
		+ '<Option value="1042">Doppietta (A39 D30)' 
		+ '<Option value="1010">Dossier on Dmitri (A0 D0)' 
		+ '<Option value="4558">Double Dare (A20 D36)' 
		+ '<Option value="4459">Double-Reign Bow (A76 D39)' 
		+ '<Option value="11055">Douglas Fir Beams (A0 D0)' 
		+ '<Option value="444">Drago (A15 D25)' 
		+ '<Option value="161">Dragon Skin Body Armor (A12 D28)' 
		+ '<Option value="2497">Dragon\'s Head (A67 D36)' 
		+ '<Option value="133">Dragunov (A36 D14)' 
		+ '<Option value="1031">Drakon (A54 D22)' 
		+ '<Option value="1535">Drug Shipment (A0 D0)' 
		+ '<Option value="615">Dublin Stallion (A26 D51)' 
		+ '<Option value="2422">Dueling Shield (A35 D69)' 
		+ '<Option value="2022">Dune Buggy (A41 D35)' 
		+ '<Option value="2461">Dune Rider Jacket (A76 D29)' 
		+ '<Option value="1708">Duster (A27 D56)' 
		+ '<Option value="973">Eagle Eye (A22 D49)' 
		+ '<Option value="1066">Eagle Owl (A32 D46)' 
		+ '<Option value="2341">Earthquake (A82 D45)' 
		+ '<Option value="140">Easter Egg Bomb (A28 D13)' 
		+ '<Option value="626">Easter Metsubushi (A26 D48)' 
		+ '<Option value="8028">Ebon Severer (A56 D84)' 
		+ '<Option value="627">Egg Crate Vest (A16 D23)' 
		+ '<Option value="5372">Eku Oar Staff (A77 D48)' 
		+ '<Option value="2058">El Escorpion (A40 D30)' 
		+ '<Option value="189">El Rey Roadster (A40 D34)' 
		+ '<Option value="359">Electric Carving Knife (A34 D18)' 
		+ '<Option value="751">Electric Eel (A36 D20)' 
		+ '<Option value="2326">Electric Prod (A50 D50)' 
		+ '<Option value="2798">Electric Prod (A78 D52)' 
		+ '<Option value="4407">Electronic Ear (A39 D74)' 
		+ '<Option value="381">Elephant Gun (A43 D17)' 
		+ '<Option value="1912">Eliminator 9mm (A57 D25)' 
		+ '<Option value="1049">Elmo Della Grande Guerra (A19 D39)' 
		+ '<Option value="987">Elvis Impersonator (A20 D48)' 
		+ '<Option value="336">EMP Bomb (A4 D32)' 
		+ '<Option value="4479">Emperor Scorpion (A45 D68)' 
		+ '<Option value="523">EMT (A18 D35)' 
		+ '<Option value="7044">Emu Ghillie Suit (A70 D39)' 
		+ '<Option value="2156">Envy (A66 D36)' 
		+ '<Option value="2338">Eruption (A37 D70)' 
		+ '<Option value="2635">Escalation (A47 D37)' 
		+ '<Option value="429">Escort (A21 D39)' 
		+ '<Option value="855">ET Hybrid (A63 D75)' 
		+ '<Option value="2416">European Scorpion (A40 D82)' 
		+ '<Option value="2498">Everglade Rat Snake (A60 D32)' 
		+ '<Option value="5385">Eviscerator Boots (A76 D53)' 
		+ '<Option value="339">Executioner Drone (A42 D22)' 
		+ '<Option value="1026">Executive Overcoat (A22 D45)' 
		+ '<Option value="1301">Executor Pistol (A58 D29)' 
		+ '<Option value="1015">Ex-KGB Bodyguard (A48 D30)' 
		+ '<Option value="277">Exploding Cigar (A35 D25)' 
		+ '<Option value="886">Exploding Pumpkin (A72 D33)' 
		+ '<Option value="572">Exploding Teddy Bear (A55 D48)' 
		+ '<Option value="669">Explosive Arrow (A0 D0)' 
		+ '<Option value="637">Explosive Putty (A31 D15)' 
		+ '<Option value="406">Explosive Watch (A29 D12)' 
		+ '<Option value="461">Ex-SEAL (A27 D45)' 
		+ '<Option value="2324">Extended Cab 640 (A53 D55)' 
		+ '<Option value="2807">Extended Cab 640 (A62 D84)' 
		+ '<Option value="710">F-25 Valkyrie (A43 D66)' 
		+ '<Option value="732">FAIL Knuckles (A22 D15)' 
		+ '<Option value="725">Fake ID (A19 D42)' 
		+ '<Option value="318">Fake Vampire Teeth (A34 D15)' 
		+ '<Option value="1573">Falcon (A58 D27)' 
		+ '<Option value="1780">Fallen Angel Arm (A37 D79)' 
		+ '<Option value="1870">Fallen Angel Arm (A40 D82)' 
		+ '<Option value="1871">Fallen Angel Arm (A42 D85)' 
		+ '<Option value="2446">Falling Leaves (A50 D81)' 
		+ '<Option value="2511">Falling Skies Technical (A36 D48)' 
		+ '<Option value="2339">Famine (A71 D36)' 
		+ '<Option value="2644">Fanteria (A23 D71)' 
		+ '<Option value="2078">Fat Cat (A15 D24)' 
		+ '<Option value="2081">Fear and Loathing (A24 D17)' 
		+ '<Option value="7036">Fearsome Flying Fortress (A47 D80)' 
		+ '<Option value="5611">Feathered Cloak (A45 D64)' 
		+ '<Option value="78">Federal Agent (A15 D25)' 
		+ '<Option value="4608">Feeding Trough (A0 D0)' 
		+ '<Option value="2063">Femme Fatale (A45 D28)' 
		+ '<Option value="7037">Femme Shot (A81 D45)' 
		+ '<Option value="4593">Fennec Fox (A25 D36)' 
		+ '<Option value="1060">Fenzi Tuorno (A52 D25)' 
		+ '<Option value="5506">Fer De Lance (A33 D18)' 
		+ '<Option value="874">Field Rider (A21 D71)' 
		+ '<Option value="769">Field Rifle (A28 D39)' 
		+ '<Option value="903">Field Vest (A42 D70)' 
		+ '<Option value="7032">Final Word (A35 D52)' 
		+ '<Option value="518">Fire Axe (A26 D17)' 
		+ '<Option value="2142">Fire Starter (A31 D61)' 
		+ '<Option value="61">Firebomb (A4 D2)' 
		+ '<Option value="662">First Blood (A49 D13)' 
		+ '<Option value="2306">Fish Spear (A72 D45)' 
		+ '<Option value="1572">Fistful of Keys (A24 D52)' 
		+ '<Option value="2793">Five Finger Fortification (A65 D80)' 
		+ '<Option value="1117">Five Finger Fortification (A53 D68)' 
		+ '<Option value="2129">Flack Dagger (A52 D26)' 
		+ '<Option value="252">Flak Jacket (A10 D25)' 
		+ '<Option value="5309">Flambe Torch (A30 D72)' 
		+ '<Option value="642">Flame Broiler (A56 D33)' 
		+ '<Option value="1928">Flame-Resistant Suit (A53 D79)' 
		+ '<Option value="40">Flamethrower (A22 D21)' 
		+ '<Option value="1781">Flanger (A80 D45)' 
		+ '<Option value="1872">Flanger (A83 D48)' 
		+ '<Option value="2085">Flex Guard (A42 D42)' 
		+ '<Option value="2402">Flicker (A82 D43)' 
		+ '<Option value="1133">Flood Damage (A40 D70)' 
		+ '<Option value="1838">Flux Compressor (A0 D0)' 
		+ '<Option value="2433">FNC Urban Transporter (A58 D26)' 
		+ '<Option value="2471">Focal Distance (A44 D81)' 
		+ '<Option value="2454">Folding Machine Gun (A54 D27)' 
		+ '<Option value="2168">Foo Fighter (A37 D60)' 
		+ '<Option value="361">Food Coma (A20 D42)' 
		+ '<Option value="450">Football Cart (A16 D30)' 
		+ '<Option value="449">Football Helmet (A13 D26)' 
		+ '<Option value="2016">Football Jersey (A10 D28)' 
		+ '<Option value="1765">Force Fire (A52 D70)' 
		+ '<Option value="4585">Forearm Guard (A38 D30)' 
		+ '<Option value="1503">Forest Scorpion (A25 D37)' 
		+ '<Option value="660">Forge (A0 D0)' 
		+ '<Option value="2434">Fox Hole (A32 D61)' 
		+ '<Option value="599">Fox Hunter Rocket Launcher (A48 D27)' 
		+ '<Option value="5412">Foxer (A70 D55)' 
		+ '<Option value="701">French Beret (A8 D21)' 
		+ '<Option value="698">French Kiss (A75 D45)' 
		+ '<Option value="2217">Frilled Lizard (A26 D57)' 
		+ '<Option value="458">Frogman (A40 D24)' 
		+ '<Option value="2099">Frontier Chainsaw (A56 D38)' 
		+ '<Option value="1539">Frost Gear (A25 D49)' 
		+ '<Option value="422">Fruitcake (A13 D15)' 
		+ '<Option value="997">FSB Agent (A42 D76)' 
		+ '<Option value="312">Fugama Gureihaundo-X (A22 D41)' 
		+ '<Option value="1529">Fugama Kame SUV (A33 D21)' 
		+ '<Option value="1902">Fugama Kameo (A46 D19)' 
		+ '<Option value="501">Fugama Kondoru (A25 D47)' 
		+ '<Option value="2190">Full Body Armor (A47 D40)' 
		+ '<Option value="2423">Full Plate Armor (A69 D37)' 
		+ '<Option value="5282">Fume Proof Mask (A30 D69)' 
		+ '<Option value="1801">Funnel Web Spider (A51 D43)' 
		+ '<Option value="390">Fur Coat (A12 D28)' 
		+ '<Option value="2183">Furnace (A0 D0)' 
		+ '<Option value="1837">Future Shock 1985 (A42 D42)' 
		+ '<Option value="2696">Gaelic Crossbow (A79 D55)' 
		+ '<Option value="200">Gaff hook (A20 D35)' 
		+ '<Option value="1712">Galapagos Hawk (A64 D32)' 
		+ '<Option value="240">Galea (A18 D45)' 
		+ '<Option value="1063">Gallo (A20 D37)' 
		+ '<Option value="5400">Game Face (A31 D43)' 
		+ '<Option value="2303">Garrotte (A73 D44)' 
		+ '<Option value="305">Garza 12 Shotgun (A12 D29)' 
		+ '<Option value="194">Garza 9 (A25 D10)' 
		+ '<Option value="1726">Gas Gun (A16 D32)' 
		+ '<Option value="56">Gas Mask (A8 D20)' 
		+ '<Option value="11063">Gate Crasher (A46 D70)' 
		+ '<Option value="2121">Gator (A22 D42)' 
		+ '<Option value="608">Gator 11-EK (A46 D29)' 
		+ '<Option value="2413">Gear Belt (A75 D29)' 
		+ '<Option value="5382">Gecko (A52 D73)' 
		+ '<Option value="335">Gene Splicer (A27 D16)' 
		+ '<Option value="1835">General Ulysses (A38 D28)' 
		+ '<Option value="417">Getaway Car Ornament (A6 D23)' 
		+ '<Option value="8181">Getaway Cruiser (A61 D83)' 
		+ '<Option value="653">Getaway Plane (A19 D47)' 
		+ '<Option value="311">Ghillie Suit (A16 D42)' 
		+ '<Option value="2647">Ghost Costume (A32 D56)' 
		+ '<Option value="326">Ghost Thug (A10 D20)' 
		+ '<Option value="5310">Giant Octopus (A30 D72)' 
		+ '<Option value="173">Giavellotto (A16 D26)' 
		+ '<Option value="427">Gift Wagon (A18 D29)' 
		+ '<Option value="2075">Gila Monster (A36 D48)' 
		+ '<Option value="2060">Gilded RPG (A29 D42)' 
		+ '<Option value="5329">Giove Velocita (A65 D52)' 
		+ '<Option value="1923">Giraffe (A41 D72)' 
		+ '<Option value="1559">Glacier (A42 D25)' 
		+ '<Option value="234">Gladius (A24 D16)' 
		+ '<Option value="644">Glance 32 SR (A33 D72)' 
		+ '<Option value="740">Global Cup (A47 D29)' 
		+ '<Option value="1854">Global Cup Ball (A36 D15)' 
		+ '<Option value="2152">Gluttony (A63 D30)' 
		+ '<Option value="2449">Go Fast Boat (A82 D45)' 
		+ '<Option value="1842">Goalie (A45 D58)' 
		+ '<Option value="114">Gold .50 Cal Pistol (A25 D15)' 
		+ '<Option value="21">Gold 9mm Gun (A15 D10)' 
		+ '<Option value="111">Gold Crowbar (A26 D23)' 
		+ '<Option value="127">Gold GX9 (A27 D18)' 
		+ '<Option value="83">Gold Mac-10 (A30 D30)' 
		+ '<Option value="84">Gold Machine Pistol (A30 D30)' 
		+ '<Option value="2670">Golden Poison Frog (A30 D75)' 
		+ '<Option value="628">Golden Ticket (A25 D13)' 
		+ '<Option value="32">Gold-Plated Magnum (A18 D16)' 
		+ '<Option value="2071">Goldsmobile (A40 D55)' 
		+ '<Option value="280">Golf Cart (A15 D20)' 
		+ '<Option value="2658">Good Neighbor (A70 D47)' 
		+ '<Option value="2489">Gopher ATV (A59 D81)' 
		+ '<Option value="1915">Gorget (A38 D63)' 
		+ '<Option value="1064">Goshawk (A47 D15)' 
		+ '<Option value="134">Grach (A20 D10)' 
		+ '<Option value="990">Grand Finale (A60 D25)' 
		+ '<Option value="1704">Grape Vine Bus (A41 D78)' 
		+ '<Option value="673">Grapple (A0 D0)' 
		+ '<Option value="337">Gravity Gun (A35 D20)' 
		+ '<Option value="362">Gravy Boat (A40 D24)' 
		+ '<Option value="5614">Gray Tail Rifle (A73 D40)' 
		+ '<Option value="731">Great Gray Owl (A37 D56)' 
		+ '<Option value="1311">Great Horned Owl (A56 D28)' 
		+ '<Option value="1802">Great White Shark (A59 D21)' 
		+ '<Option value="2153">Greed (A31 D63)' 
		+ '<Option value="614">Green Limo (A19 D17)' 
		+ '<Option value="1940">Green Machine (A45 D21)' 
		+ '<Option value="2202">Green Mamba (A72 D39)' 
		+ '<Option value="14">Grenade Launcher (A14 D10)' 
		+ '<Option value="418">Grenade Ornament (A19 D10)' 
		+ '<Option value="876">Grim Reaper (A67 D51)' 
		+ '<Option value="878">Grip Gloves (A41 D66)' 
		+ '<Option value="1803">Grizzly Bear (A25 D59)' 
		+ '<Option value="4480">Grizzly Man-Eater (A73 D33)' 
		+ '<Option value="2218">Ground Hugger (A55 D30)' 
		+ '<Option value="1713">Growler (A33 D65)' 
		+ '<Option value="1766">Growler Firearm (A58 D45)' 
		+ '<Option value="425">GrowPet (A27 D12)' 
		+ '<Option value="7045">Grump Truck (A41 D72)' 
		+ '<Option value="1716">Guard Vest (A17 D32)' 
		+ '<Option value="188">Guardia Presidencial (A42 D32)' 
		+ '<Option value="317">Guerilla Bodyguard (A25 D44)' 
		+ '<Option value="306">Guerilla Truck (A15 D31)' 
		+ '<Option value="190">Guerrilla Commando (A38 D35)' 
		+ '<Option value="174">Guerrilla Squad (A34 D30)' 
		+ '<Option value="349">Guitar Case Machine Gun (A41 D26)' 
		+ '<Option value="7039">Gun Barge (A50 D36)' 
		+ '<Option value="659">Gun Drill (A0 D0)' 
		+ '<Option value="7052">Gungnir (A82 D60)' 
		+ '<Option value="658">Gunpowder (A0 D0)' 
		+ '<Option value="70">GX9 (A20 D14)' 
		+ '<Option value="1567">H-13 Med Evac (A32 D55)' 
		+ '<Option value="1914">H68 SMG-2 (A56 D27)' 
		+ '<Option value="2327">Hack Blade (A45 D51)' 
		+ '<Option value="2799">Hack Blade (A60 D79)' 
		+ '<Option value="1714">Hack N Slash (A65 D35)' 
		+ '<Option value="2083">Haig and Hower B200 (A40 D40)' 
		+ '<Option value="1132">Hail Storm Jacket (A72 D36)' 
		+ '<Option value="411">Haitian Drum (A44 D46)' 
		+ '<Option value="454">Haitian Relief Drum (A44 D46)' 
		+ '<Option value="126">Half Dollar Body Armor (A13 D30)' 
		+ '<Option value="329">Halloween Candy Truck (A20 D35)' 
		+ '<Option value="2196">Hammer (A0 D0)' 
		+ '<Option value="577">Hammer 760-EK (A53 D21)' 
		+ '<Option value="1930">Hammer Hawk (A52 D82)' 
		+ '<Option value="851">Hard as Nails (A38 D66)' 
		+ '<Option value="2069">Hard Four (A30 D50)' 
		+ '<Option value="2079">Hardway (A24 D18)' 
		+ '<Option value="5277">Harper 12 (A41 D71)' 
		+ '<Option value="5290">Harpoon GT (A72 D43)' 
		+ '<Option value="160">Harpoon Gun (A19 D13)' 
		+ '<Option value="2215">Harpy Eagle (A42 D77)' 
		+ '<Option value="826">Havok\'s Chest (A38 D63)' 
		+ '<Option value="645">Hazard Gear (A35 D71)' 
		+ '<Option value="7033">Heads Up (A28 D64)' 
		+ '<Option value="243">Hearse (A10 D20)' 
		+ '<Option value="517">Heart Breaker (A21 D13)' 
		+ '<Option value="1767">Heat Seeker (A46 D60)' 
		+ '<Option value="5405">Heavy Assault Squad (A31 D58)' 
		+ '<Option value="624">Heavy Hand (A43 D23)' 
		+ '<Option value="104">Hedge Clippers (A24 D6)' 
		+ '<Option value="2346">Hell Sickle (A36 D77)' 
		+ '<Option value="2412">Hellbender (A35 D82)' 
		+ '<Option value="2490">Hellcat Cannon (A78 D55)' 
		+ '<Option value="248">Hellfire Auto-Shotgun (A32 D13)' 
		+ '<Option value="705">Hephaestus Cannon (A56 D26)' 
		+ '<Option value="2158">Her Pretty Head (A38 D76)' 
		+ '<Option value="510">Hidden Sentry (A9 D22)' 
		+ '<Option value="754">High Roller (A46 D23)' 
		+ '<Option value="2025">High Society (A37 D29)' 
		+ '<Option value="635">High Tech Car Part (A0 D0)' 
		+ '<Option value="512">Highball (A36 D24)' 
		+ '<Option value="2068">Highrise Sport (A29 D38)' 
		+ '<Option value="607">Hijacked Crane (A33 D54)' 
		+ '<Option value="2113">Hill\'s Armored Transport (A27 D59)' 
		+ '<Option value="881">Hippopotamus (A63 D46)' 
		+ '<Option value="445">Hockey Stick (A23 D18)' 
		+ '<Option value="304">Hoja Doble (A30 D11)' 
		+ '<Option value="435">Holiday Scarf (A13 D24)' 
		+ '<Option value="420">Holiday Star (A15 D20)' 
		+ '<Option value="5335">Holy Hand Grenade (A71 D57)' 
		+ '<Option value="1715">Home Cooked Meal (A18 D68)' 
		+ '<Option value="519">Hook and Ladder Truck (A15 D27)' 
		+ '<Option value="1768">Hook Sword (A72 D51)' 
		+ '<Option value="1804">Hopi Rattle Snake (A58 D32)' 
		+ '<Option value="2165">Hopped-Up Thug (A56 D18)' 
		+ '<Option value="2499">Hornet Goggles (A25 D47)' 
		+ '<Option value="244">Hornet Sniper Rifle (A11 D34)' 
		+ '<Option value="611">Horse Trailer (A22 D16)' 
		+ '<Option value="610">Horse Training Whip (A24 D13)' 
		+ '<Option value="2030">Hot Tip (A0 D0)' 
		+ '<Option value="2029">Hotel Security Key Card (A0 D0)' 
		+ '<Option value="649">House Cat (A50 D37)' 
		+ '<Option value="1131">House Fire (A74 D35)' 
		+ '<Option value="267">Howler Monkey (A20 D37)' 
		+ '<Option value="182">Hu-9 Helicopter (A36 D27)' 
		+ '<Option value="465">Huey (A47 D20)' 
		+ '<Option value="496">Hung Chu Enforcer (A16 D24)' 
		+ '<Option value="1504">Hung Fa RPG (A39 D20)' 
		+ '<Option value="634">Hunter \'Spy\' XS (A52 D29)' 
		+ '<Option value="2804">Hunter \'Spy\' XS (A76 D55)' 
		+ '<Option value="154">Hunter\'s Vest (A14 D26)' 
		+ '<Option value="148">Hunting Knife (A21 D9)' 
		+ '<Option value="150">Hunting Rifle (A30 D10)' 
		+ '<Option value="722">Hush Puppy (A34 D16)' 
		+ '<Option value="233">Hydrofoil (A8 D38)' 
		+ '<Option value="574">Hyena on Chain (A20 D16)' 
		+ '<Option value="1538">Hyro Glove (A23 D53)' 
		+ '<Option value="1908">HyroTM Torso Guard (A70 D31)' 
		+ '<Option value="156">I <3 Mom Tattoo (A15 D22)' 
		+ '<Option value="7029">Ice Climber (A54 D29)' 
		+ '<Option value="7026">Ice Climbing Gear (A28 D55)' 
		+ '<Option value="1556">Ice Pick (A22 D35)' 
		+ '<Option value="347">Idaho Special (A22 D15)' 
		+ '<Option value="2706">Idle Hands (A45 D79)' 
		+ '<Option value="2466">Igloo Shield (A82 D44)' 
		+ '<Option value="7021">I\'ll Be Back (A43 D36)' 
		+ '<Option value="2212">Immelman (A51 D27)' 
		+ '<Option value="1560">Immersion Suit (A28 D44)' 
		+ '<Option value="135">Impression (A15 D35)' 
		+ '<Option value="554">Incognito ZX3000 (A35 D25)' 
		+ '<Option value="2210">Indian Katar (A33 D62)' 
		+ '<Option value="171">Indy Racer (A16 D22)' 
		+ '<Option value="313">Inferno SAM Launcher (A40 D25)' 
		+ '<Option value="904">Infighter (A71 D44)' 
		+ '<Option value="891">Infiltration Gear (A72 D40)' 
		+ '<Option value="622">Inflatable Motorboat (A13 D21)' 
		+ '<Option value="403">Infrared Scanner (A9 D22)' 
		+ '<Option value="681">Ingred 9-9 (A14 D22)' 
		+ '<Option value="741">Injury Time (A38 D52)' 
		+ '<Option value="2692">Irish Elk (A54 D76)' 
		+ '<Option value="1037">Irish Traveler (A52 D63)' 
		+ '<Option value="616">Irish Wolfhound (A48 D29)' 
		+ '<Option value="2361">Iron And Silk (A74 D73)' 
		+ '<Option value="332">Iron Bull (A28 D42)' 
		+ '<Option value="11054">Iron Cast (A0 D0)' 
		+ '<Option value="4587">Iron Chest Plate (A49 D57)' 
		+ '<Option value="978">Iron Curtain (A30 D39)' 
		+ '<Option value="524">Ironside Tactical Vest (A27 D49)' 
		+ '<Option value="1786">Italian Housekeeper (A76 D35)' 
		+ '<Option value="1861">Italian Housekeeper (A80 D38)' 
		+ '<Option value="1862">Italian Housekeeper (A83 D40)' 
		+ '<Option value="5330">Italian Porcupine (A56 D66)' 
		+ '<Option value="1061">Italian Wolf (A43 D33)' 
		+ '<Option value="136">IZH-35m (A25 D15)' 
		+ '<Option value="1703">Jackal (A25 D65)' 
		+ '<Option value="846">Jackal ATV (A50 D67)' 
		+ '<Option value="5624">Jackalope (A77 D42)' 
		+ '<Option value="247">Jackhammer (A15 D15)' 
		+ '<Option value="761">Jackpot (A30 D54)' 
		+ '<Option value="1502">Jade Inlaid Pistol (A23 D15)' 
		+ '<Option value="246">Jaguar (A45 D24)' 
		+ '<Option value="2200">Jaws of Life (A35 D62)' 
		+ '<Option value="221">Jetpack Prototype (A38 D7)' 
		+ '<Option value="770">Jimmy\'s 220 Sunset (A48 D23)' 
		+ '<Option value="5509">Jiu Jitsu Gi (A49 D27)' 
		+ '<Option value="2309">Jointed Panel (A46 D74)' 
		+ '<Option value="735">Joy Buzzer (A15 D21)' 
		+ '<Option value="1769">Juggernaut (A65 D79)' 
		+ '<Option value="5682">Jungle Hacker (A57 D85)' 
		+ '<Option value="953">Jungle Machete (A69 D32)' 
		+ '<Option value="7022">Jungle Strike (A36 D43)' 
		+ '<Option value="950">Jungle Wasp Bow (A46 D23)' 
		+ '<Option value="1762">Juvenile Tiger (A70 D51)' 
		+ '<Option value="1526">Kage Jet (A27 D42)' 
		+ '<Option value="119">Kamas (A13 D17)' 
		+ '<Option value="752">Kangaroo (A30 D29)' 
		+ '<Option value="4410">KAO Rockstar (A75 D41)' 
		+ '<Option value="894">Killer Whale (A27 D56)' 
		+ '<Option value="2410">Killing Time (A81 D37)' 
		+ '<Option value="753">King Cheetah (A21 D42)' 
		+ '<Option value="1771">King Cobra (A80 D62)' 
		+ '<Option value="4462">King Penguin (A42 D76)' 
		+ '<Option value="680">King Snake (A23 D12)' 
		+ '<Option value="254">Kingfish Powerboat (A20 D34)' 
		+ '<Option value="11065">Kisser Splitter (A49 D75)' 
		+ '<Option value="2500">Kitchen Knife (A57 D27)' 
		+ '<Option value="2349">Kleinfeld\'s Boat (A25 D77)' 
		+ '<Option value="1033">Klyk-9 Machine Pistol (A21 D43)' 
		+ '<Option value="105">Knee-Capper (A16 D14)' 
		+ '<Option value="4402">Knockout (A51 D23)' 
		+ '<Option value="209">Knuckle Duster (A13 D27)' 
		+ '<Option value="2401">Knuckle Knife (A42 D82)' 
		+ '<Option value="345">Knuckle Shotty (A18 D25)' 
		+ '<Option value="412">Knuckle Trimmer (A31 D23)' 
		+ '<Option value="293">Kodiak (A44 D28)' 
		+ '<Option value="597">Koenigsberg S10 (A30 D46)' 
		+ '<Option value="1501">Komodo Dragon (A34 D22)' 
		+ '<Option value="1029">Konstantin Cargo Carrier (A18 D44)' 
		+ '<Option value="322">Kraken (A24 D41)' 
		+ '<Option value="118">Kunai (A18 D12)' 
		+ '<Option value="8089">Kung-Fu Outfit (A35 D74)' 
		+ '<Option value="8090">Kung-Fu Outfit (A38 D76)' 
		+ '<Option value="8091">Kung-Fu Outfit (A41 D78)' 
		+ '<Option value="447">Lacross Stick (A18 D19)' 
		+ '<Option value="991">Lady Liberty (A33 D59)' 
		+ '<Option value="1757">Lady Luck\'s Tessan (A70 D38)' 
		+ '<Option value="1548">Lamang Motorcycle (A49 D34)' 
		+ '<Option value="2352">Lamprey Eel (A81 D51)' 
		+ '<Option value="2334">Landslide (A67 D31)' 
		+ '<Option value="2663">Lantern Fish (A72 D51)' 
		+ '<Option value="664">Laser Guided RPG (A37 D42)' 
		+ '<Option value="671">Laser Rangefinder (A0 D0)' 
		+ '<Option value="325">Laser Squirrel (A43 D12)' 
		+ '<Option value="164">Lasso (A22 D8)' 
		+ '<Option value="620">Last Call (A45 D33)' 
		+ '<Option value="11053">Lath Strips (A0 D0)' 
		+ '<Option value="283">Le Tigre (A26 D15)' 
		+ '<Option value="294">Lefty Guns\' Leather Coat (A10 D24)' 
		+ '<Option value="2711">Leg Up (A80 D61)' 
		+ '<Option value="1722">Legacy (A70 D47)' 
		+ '<Option value="5367">Lemon Drop (A61 D25)' 
		+ '<Option value="166">Lever Action Rifle (A31 D9)' 
		+ '<Option value="288">Liger (A45 D12)' 
		+ '<Option value="53">Light Anti Tank Weapon (A22 D21)' 
		+ '<Option value="2336">Lightning Strike (A65 D30)' 
		+ '<Option value="898">Limpet Mine (A29 D61)' 
		+ '<Option value="5019">Liquor (A0 D0)' 
		+ '<Option value="499">Lloyds Archangel (A32 D24)' 
		+ '<Option value="1522">Lloyds Spectre (A18 D45)' 
		+ '<Option value="1913">Lloyds Zephyr (A63 D29)' 
		+ '<Option value="185">Lobo Armored 4x4 (A28 D36)' 
		+ '<Option value="331">Lobotomizer (A39 D14)' 
		+ '<Option value="4561">Lock and Stock (A50 D58)' 
		+ '<Option value="387">Locket of Billie (A10 D36)' 
		+ '<Option value="713">Lone Wolf (A44 D30)' 
		+ '<Option value="526">Lonely Heart (A48 D20)' 
		+ '<Option value="2421">Long Tailed Pangolin (A68 D40)' 
		+ '<Option value="407">Loose Caboose (A17 D30)' 
		+ '<Option value="239">Lorica (A18 D32)' 
		+ '<Option value="184">Lou\'s Midnight Special (A36 D14)' 
		+ '<Option value="4401">Love Sick (A27 D51)' 
		+ '<Option value="1943">Lovebird (A52 D36)' 
		+ '<Option value="213">Low Rider (A12 D44)' 
		+ '<Option value="1918">Lucella GTS (A43 D65)' 
		+ '<Option value="613">Lucky Hat (A17 D20)' 
		+ '<Option value="2431">Lucky Number Seven (A55 D27)' 
		+ '<Option value="60">Lucky Shamrock Medallion (A1 D7)' 
		+ '<Option value="360">Lucky Wishbone (A16 D36)' 
		+ '<Option value="266">Lumberjack (A39 D18)' 
		+ '<Option value="423">Lump of Coal (A22 D14)' 
		+ '<Option value="847">Lump of Coal (A1 D1)' 
		+ '<Option value="2151">Lust (A29 D62)' 
		+ '<Option value="1058">Luxury Sailboat (A27 D51)' 
		+ '<Option value="69">Luxury Yacht (A10 D20)' 
		+ '<Option value="196">M16A1 (A30 D12)' 
		+ '<Option value="144">M32 Grenade Launcher (A28 D12)' 
		+ '<Option value="2656">M45 Overcast (A66 D44)' 
		+ '<Option value="130">M468 Assault Rifle (A28 D14)' 
		+ '<Option value="1305">M9 Trebuchet (A40 D79)' 
		+ '<Option value="271">Ma Barker\'s Machine Gun (A30 D20)' 
		+ '<Option value="25">Mac-10 (A7 D5)' 
		+ '<Option value="2087">Mace (A30 D49)' 
		+ '<Option value="781">Mach-4 (A66 D48)' 
		+ '<Option value="268">Machine Gun Kelly\'s Gun (A25 D14)' 
		+ '<Option value="3521">Mad Gifter (A0 D0)' 
		+ '<Option value="1052">Maglietta (A33 D45)' 
		+ '<Option value="2213">Magma Magnifique (A31 D63)' 
		+ '<Option value="766">Magnetic Lock (A0 D0)' 
		+ '<Option value="31">Magnum (A8 D6)' 
		+ '<Option value="2786">Malayan Tiger (A79 D58)' 
		+ '<Option value="1111">Malayan Tiger (A64 D48)' 
		+ '<Option value="1524">MalayMobil Helang (A19 D34)' 
		+ '<Option value="2112">Maltese Falcon (A42 D65)' 
		+ '<Option value="8082">Mamacita (A80 D44)' 
		+ '<Option value="8083">Mamacita (A83 D45)' 
		+ '<Option value="8084">Mamacita (A84 D47)' 
		+ '<Option value="8102">Man Eating Plant (A80 D49)' 
		+ '<Option value="8103">Man Eating Plant (A83 D51)' 
		+ '<Option value="8104">Man Eating Plant (A84 D54)' 
		+ '<Option value="1916">Man Opener (A63 D40)' 
		+ '<Option value="2141">Mandrill (A35 D67)' 
		+ '<Option value="442">Manhattan Ball Drop (A19 D30)' 
		+ '<Option value="344">Manhunter Shotgun (A40 D24)' 
		+ '<Option value="1065">Man-of-War (A12 D43)' 
		+ '<Option value="175">Mara Serpiente (A24 D18)' 
		+ '<Option value="5348">Marco Marino AF (A68 D47)' 
		+ '<Option value="2187">Mariner\'s Suit (A43 D39)' 
		+ '<Option value="2214">Markhor (A75 D37)' 
		+ '<Option value="399">Marshmallow Overload (A39 D16)' 
		+ '<Option value="1067">Marsican Brown Bear (A48 D27)' 
		+ '<Option value="3007">Martian Canal Boat (A43 D71)' 
		+ '<Option value="2131">Mason (A26 D57)' 
		+ '<Option value="5364">Master (A48 D60)' 
		+ '<Option value="5408">Master (A58 D76)' 
		+ '<Option value="1069">Meadow Viper (A62 D37)' 
		+ '<Option value="59">Meat Cleaver (A22 D21)' 
		+ '<Option value="82">Meat Hook (A23 D22)' 
		+ '<Option value="1834">Meat Tenderizer (A25 D56)' 
		+ '<Option value="5317">Meat Truck (A30 D72)' 
		+ '<Option value="256">Meatgrinder (A37 D14)' 
		+ '<Option value="2473">Mechanized Crocodilian (A84 D49)' 
		+ '<Option value="1846">Medic Cart (A19 D18)' 
		+ '<Option value="557">Mesh Alloy (A23 D47)' 
		+ '<Option value="153">Mesh Trucker Hat (A10 D20)' 
		+ '<Option value="1850">Mexican Ball (A16 D36)' 
		+ '<Option value="2451">Miami Vice (A51 D82)' 
		+ '<Option value="2193">Micro-Fission Cell (A0 D0)' 
		+ '<Option value="128">Midas\' Butterfly Knife (A26 D20)' 
		+ '<Option value="2320">Midnight (A28 D33)' 
		+ '<Option value="551">\'Mightier\' Pen (A27 D13)' 
		+ '<Option value="1045">Milano Foil (A31 D50)' 
		+ '<Option value="598">Military Spy Drone (A33 D47)' 
		+ '<Option value="180">Mini-Sub (A30 D25)' 
		+ '<Option value="2462">Mirage (A40 D77)' 
		+ '<Option value="436">Mistletoe Launcher (A23 D13)' 
		+ '<Option value="2191">MNU Suit (A31 D50)' 
		+ '<Option value="7047">Mobile Fortress (A70 D42)' 
		+ '<Option value="853">Mobile Garage (A55 D79)' 
		+ '<Option value="394">Modified Tommy Gun (A21 D13)' 
		+ '<Option value="2070">Mojave Mike (A40 D53)' 
		+ '<Option value="1000">Molotok Pistol (A22 D26)' 
		+ '<Option value="2130">Molten Metallic (A55 D30)' 
		+ '<Option value="323">Monkey Brain Stew (A2 D27)' 
		+ '<Option value="1514">Monk\'s Robe (A29 D41)' 
		+ '<Option value="178">Montaine 320 (A27 D23)' 
		+ '<Option value="889">Monterey Manta (A58 D34)' 
		+ '<Option value="2128">Morning Star (A28 D51)' 
		+ '<Option value="765">Motion Sensor (A0 D0)' 
		+ '<Option value="408">Motion Sensor Explosive (A39 D25)' 
		+ '<Option value="2017">Motorcycle Helmet (A22 D32)' 
		+ '<Option value="543">Motorcycle Jacket (A25 D50)' 
		+ '<Option value="546">Mountain Goat (A22 D52)' 
		+ '<Option value="1563">Mounted Mini Gun (A26 D58)' 
		+ '<Option value="2019">Moving Truck (A12 D20)' 
		+ '<Option value="530">Mr. Pinchy (A22 D12)' 
		+ '<Option value="1512">Muai Thai Bodyguard (A18 D25)' 
		+ '<Option value="2712">Mud Crawler (A60 D81)' 
		+ '<Option value="2123">Mud Slinger (A26 D47)' 
		+ '<Option value="2343">Mud Snake (A68 D32)' 
		+ '<Option value="633">Mugati Sport (A35 D51)' 
		+ '<Option value="2803">Mugati Sport (A51 D75)' 
		+ '<Option value="5411">Mugger Crocodile (A46 D85)' 
		+ '<Option value="72">Multi-Purpose Truck (A26 D22)' 
		+ '<Option value="2447">Murder of Crows (A49 D79)' 
		+ '<Option value="553">Murder Permit (A34 D19)' 
		+ '<Option value="226">Musket (A25 D5)' 
		+ '<Option value="463">Mustard Gas (A43 D17)' 
		+ '<Option value="650">My Little Friend (A51 D34)' 
		+ '<Option value="327">Mystery Van (A15 D15)' 
		+ '<Option value="4478">N7 Tomahawk (A71 D28)' 
		+ '<Option value="902">Nail Biter (A35 D58)' 
		+ '<Option value="108">Nail Gun (A28 D12)' 
		+ '<Option value="1542">Nak Kha Shotgun (A47 D31)' 
		+ '<Option value="120">Nambu Type 14 Pistol (A22 D8)' 
		+ '<Option value="20">Napalm Bomb (A25 D9)' 
		+ '<Option value="4559">Need a Jump? (A38 D38)' 
		+ '<Option value="1051">Neoprene Vest (A46 D28)' 
		+ '<Option value="272">Ness\' Fedora (A28 D22)' 
		+ '<Option value="1856">Netherlands Ball (A18 D35)' 
		+ '<Option value="843">New Years Party Bus (A42 D52)' 
		+ '<Option value="844">New Years Resolution (A69 D46)' 
		+ '<Option value="101">Nicky\'s Harlem Special (A24 D23)' 
		+ '<Option value="2347">Nightmare (A77 D37)' 
		+ '<Option value="2442">Nightmare Claw (A80 D41)' 
		+ '<Option value="2094">Nile Crocodile (A57 D37)' 
		+ '<Option value="1545">Ninja (A47 D35)' 
		+ '<Option value="661">Ninja Sai (A30 D40)' 
		+ '<Option value="5619">North American Porcupine (A51 D85)' 
		+ '<Option value="5618">Northern Pike (A83 D56)' 
		+ '<Option value="974">Notch .40 Cal (A51 D28)' 
		+ '<Option value="8092">Nun Chucks (A79 D41)' 
		+ '<Option value="8093">Nun Chucks (A81 D42)' 
		+ '<Option value="8094">Nun Chucks (A83 D44)' 
		+ '<Option value="121">Nunchucks (A22 D18)' 
		+ '<Option value="419">Nutcracker (A25 D12)' 
		+ '<Option value="2654">Nyala (A40 D65)' 
		+ '<Option value="7042">Nyathi (A40 D73)' 
		+ '<Option value="177">Ocelot Armored Truck (A18 D28)' 
		+ '<Option value="217">Off Duty Cop (A22 D18)' 
		+ '<Option value="1018">Officer Corps Paycheck (A0 D0)' 
		+ '<Option value="2636">Officer\'s Jacket (A48 D40)' 
		+ '<Option value="2108">Offroad (A51 D23)' 
		+ '<Option value="2332">Offroad Racer (A75 D41)' 
		+ '<Option value="771">One-Armed Bandit (A28 D50)' 
		+ '<Option value="2101">Oppressor (A63 D31)' 
		+ '<Option value="1516">Optical Camo Suit (A43 D26)' 
		+ '<Option value="1314">Opulence (A40 D83)' 
		+ '<Option value="2714">Orangutan (A82 D68)' 
		+ '<Option value="1021">Orel Armored Helicopter (A24 D40)' 
		+ '<Option value="1027">Osa 17 Snowmobile (A38 D24)' 
		+ '<Option value="2637">Osprey (A52 D24)' 
		+ '<Option value="772">Osprey Helicopter (A32 D67)' 
		+ '<Option value="5628">Ostrich Egg Bomb (A82 D41)' 
		+ '<Option value="2655">Ottoman Krug (A43 D64)' 
		+ '<Option value="944">Outlander (A62 D40)' 
		+ '<Option value="1926">Pacific Manta (A75 D50)' 
		+ '<Option value="5387">Pack Hunter (A51 D70)' 
		+ '<Option value="5389">Pack Hunter (A58 D80)' 
		+ '<Option value="948">Pack Mule (A41 D22)' 
		+ '<Option value="767">Padded Heavy Jacket (A28 D24)' 
		+ '<Option value="1784">Padded Jersey (A34 D73)' 
		+ '<Option value="1796">Padded Jersey (A37 D77)' 
		+ '<Option value="1797">Padded Jersey (A40 D81)' 
		+ '<Option value="1901">Padded Suit (A26 D45)' 
		+ '<Option value="1710">Pair of Armored Biker Boots (A27 D59)' 
		+ '<Option value="2662">Pair of Armored Shoulder Pads (A43 D71)' 
		+ '<Option value="502">Pair of Bladed Tonfas (A22 D19)' 
		+ '<Option value="3">Pair of Brass Knuckles (A2 D2)' 
		+ '<Option value="168">Pair of Cowboy Boots (A15 D25)' 
		+ '<Option value="468">Pair of Deadly Silver Knuckles (A22 D28)' 
		+ '<Option value="388">Pair of Dillinger\'s Sunglasses (A23 D34)' 
		+ '<Option value="222">Pair of Flintlock Pistols (A14 D6)' 
		+ '<Option value="975">Pair of HyroTM Ultra Light Boots (A26 D54)' 
		+ '<Option value="441">Pair of Ice Skates (A16 D20)' 
		+ '<Option value="2107">Pair of Joint Protectors (A34 D67)' 
		+ '<Option value="988">Pair of Kings (A56 D26)' 
		+ '<Option value="400">Pair of Nitro Skates (A19 D36)' 
		+ '<Option value="334">Pair of Ocular Implants (A25 D26)' 
		+ '<Option value="555">Pair of Optiks (A23 D36)' 
		+ '<Option value="142">Pair of Pet Tigers (A28 D12)' 
		+ '<Option value="2186">Pair of Plastic Leggings (A33 D41)' 
		+ '<Option value="2062">Pair of Reinforced Boots (A27 D19)' 
		+ '<Option value="396">Pair of Santa\'s Helpers (A26 D8)' 
		+ '<Option value="2404">Pair of Security Gloves (A82 D38)' 
		+ '<Option value="383">Pair of Sharkskin Gloves (A25 D37)' 
		+ '<Option value="446">Pair of Shin Guards (A16 D23)' 
		+ '<Option value="522">Pair of Shock Paddles (A36 D16)' 
		+ '<Option value="113">Pair of Silver Knuckles (A25 D24)' 
		+ '<Option value="849">Pair of Skywalkers (A28 D61)' 
		+ '<Option value="1555">Pair of Snow Shoes (A36 D21)' 
		+ '<Option value="743">Pair of Soccer Cleats (A24 D15)' 
		+ '<Option value="1845">Pair of Spiked Cleats (A24 D18)' 
		+ '<Option value="163">Pair of Spurs (A20 D10)' 
		+ '<Option value="550">Pair of Steeltips (A20 D26)' 
		+ '<Option value="2328">Pair of Stun Knuckles (A52 D48)' 
		+ '<Option value="2800">Pair of Stun Knuckles (A83 D55)' 
		+ '<Option value="2671">Pair of Traceless Gloves (A55 D28)' 
		+ '<Option value="625">Pair of Trekker Boots (A23 D38)' 
		+ '<Option value="609">Pair of Vintage Binoculars (A14 D23)' 
		+ '<Option value="2106">Pair of Weighted Gloves (A57 D29)' 
		+ '<Option value="143">Pair of Weighted Knuckle Gloves (A18 D11)' 
		+ '<Option value="514">Pair of Wilted Roses (A13 D16)' 
		+ '<Option value="2342">Pair of Wired Shades (A42 D75)' 
		+ '<Option value="2321">Palermo Luxury (A36 D35)' 
		+ '<Option value="716">Palermo Prowler (A44 D19)' 
		+ '<Option value="5366">Palm Protectors (A60 D35)' 
		+ '<Option value="251">Panama Hat (A18 D35)' 
		+ '<Option value="2093">Panel Vest (A56 D36)' 
		+ '<Option value="2100">Pangolin AP (A27 D57)' 
		+ '<Option value="4586">Pantheon Tactical Helm (A55 D48)' 
		+ '<Option value="2648">Pantomime Horse (A57 D31)' 
		+ '<Option value="199">Para 322 (A34 D14)' 
		+ '<Option value="353">Parade Balloon (A14 D28)' 
		+ '<Option value="992">Parade Stallion (A60 D28)' 
		+ '<Option value="290">Paratrooper\'s Gear (A36 D15)' 
		+ '<Option value="697">Parisian Fixer (A30 D61)' 
		+ '<Option value="238">Parma (A15 D25)' 
		+ '<Option value="443">Party Balloons (A6 D18)' 
		+ '<Option value="981">Party Favor (A45 D34)' 
		+ '<Option value="982">Party Popper (A32 D46)' 
		+ '<Option value="1721">Patriot (A53 D68)' 
		+ '<Option value="1734">Pay Back (A65 D43)' 
		+ '<Option value="355">Pea Shooter (A26 D12)' 
		+ '<Option value="167">Pearl-Handled Revolver (A40 D10)' 
		+ '<Option value="5406">Pecuna Blowgun (A45 D24)' 
		+ '<Option value="742">Penalty Shot (A8 D21)' 
		+ '<Option value="1558">Penguin AquaCraft (A36 D25)' 
		+ '<Option value="714">Pepper Shaker (A31 D45)' 
		+ '<Option value="2119">Pepperbox Pistol (A64 D30)' 
		+ '<Option value="2475">Perambulation (A80 D43)' 
		+ '<Option value="2023">Performance Sports Car (A47 D38)' 
		+ '<Option value="1787">Perini-R (A43 D78)' 
		+ '<Option value="1863">Perini-R (A46 D81)' 
		+ '<Option value="1864">Perini-R (A49 D84)' 
		+ '<Option value="300">Personal Watercraft (A40 D14)' 
		+ '<Option value="2109">Pesaro Racer (A28 D61)' 
		+ '<Option value="2661">Pesce Spada (A71 D35)' 
		+ '<Option value="2657">Phantasm (A67 D45)' 
		+ '<Option value="4474">Phantom Body Armor (A38 D71)' 
		+ '<Option value="4595">Philippine Eagle (A48 D31)' 
		+ '<Option value="296">Phoenix Hang-Glider (A38 D15)' 
		+ '<Option value="131">Phone Bomb (A27 D18)' 
		+ '<Option value="22">Piano Wire (A10 D5)' 
		+ '<Option value="351">Pigskin Helmet (A18 D24)' 
		+ '<Option value="433">Pile of Snowballs (A11 D18)' 
		+ '<Option value="235">Pilum (A26 D14)' 
		+ '<Option value="5404">Pink Birdeater Tarantula (A65 D34)' 
		+ '<Option value="378">Pinstripe Suit (A21 D38)' 
		+ '<Option value="117">Pint o\' Green Beer (A15 D29)' 
		+ '<Option value="639">Pipe Bomb (A38 D32)' 
		+ '<Option value="2664">Pirahna XE (A72 D55)' 
		+ '<Option value="750">Piranha (A23 D35)' 
		+ '<Option value="1536">Pirate (A0 D0)' 
		+ '<Option value="1772">Pisces Harpoon Gun (A64 D78)' 
		+ '<Option value="2160">Pitbull Sentry Gun (A28 D52)' 
		+ '<Option value="2660">Pitch Car (A50 D70)' 
		+ '<Option value="778">Plains Zebra (A28 D60)' 
		+ '<Option value="667">Plasma Rifle (A40 D47)' 
		+ '<Option value="2796">Plasma Rifle (A52 D75)' 
		+ '<Option value="2132">PlastiPlate Jacket (A29 D59)' 
		+ '<Option value="5371">Plated Mini-Dress (A75 D41)' 
		+ '<Option value="2411">Plum Putter (A82 D42)' 
		+ '<Option value="1005">PNV (A21 D31)' 
		+ '<Option value="1907">Poison Dart Frog (A28 D68)' 
		+ '<Option value="720">Poison Filled Ring (A32 D17)' 
		+ '<Option value="100">Poison Gas Grenade (A22 D26)' 
		+ '<Option value="8099">Poison Vines (A40 D74)' 
		+ '<Option value="8100">Poison Vines (A42 D78)' 
		+ '<Option value="8101">Poison Vines (A45 D79)' 
		+ '<Option value="1581">Poker Table (A0 D0)' 
		+ '<Option value="1557">Polar Bear (A43 D26)' 
		+ '<Option value="81">Police Baton (A23 D22)' 
		+ '<Option value="76">Police Cruiser (A22 D28)' 
		+ '<Option value="2065">Police Riot Helmet (A30 D44)' 
		+ '<Option value="245">Politico Corrupto (A0 D0)' 
		+ '<Option value="5336">Pontiff-1 (A66 D49)' 
		+ '<Option value="5337">Popemobile (A30 D62)' 
		+ '<Option value="5320">Portable Defibrillator (A51 D37)' 
		+ '<Option value="655">Portable Fusion Reactor (A0 D0)' 
		+ '<Option value="2415">Portable Road Block (A33 D75)' 
		+ '<Option value="358">Potato Mash (A24 D21)' 
		+ '<Option value="352">Potato Masher (A26 D17)' 
		+ '<Option value="2192">Power Armor (A43 D53)' 
		+ '<Option value="2790">Power Armor (A55 D75)' 
		+ '<Option value="102">Power Cutter (A35 D15)' 
		+ '<Option value="382">Power Plough (A20 D16)' 
		+ '<Option value="533">Power Tool (A0 D0)' 
		+ '<Option value="137">PPSH 41 Submachine gun (A22 D8)' 
		+ '<Option value="2024">Precision SMG (A42 D30)' 
		+ '<Option value="4560">Predator Minigun (A55 D46)' 
		+ '<Option value="2188">Pressure Suit (A45 D40)' 
		+ '<Option value="269">Pretty Boy Floyd\'s .45 (A22 D22)' 
		+ '<Option value="2157">Pride (A78 D40)' 
		+ '<Option value="868">Prism Armored Vest (A79 D41)' 
		+ '<Option value="75">Private Jet (A12 D39)' 
		+ '<Option value="1718">Prized Pet (A50 D26)' 
		+ '<Option value="2171">Pronghorn Antelope (A21 D53)' 
		+ '<Option value="1749">Prop 4 (A65 D55)' 
		+ '<Option value="66">Prop plane (A5 D20)' 
		+ '<Option value="44">Propane Bomb (A22 D21)' 
		+ '<Option value="284">Pro\'s 2 Iron (A24 D19)' 
		+ '<Option value="1701">Protective Shirt (A27 D64)' 
		+ '<Option value="389">Public Enemy #1 Newspaper (A6 D30)' 
		+ '<Option value="2405">Puff Adder (A35 D75)' 
		+ '<Option value="236">Puggio (A17 D23)' 
		+ '<Option value="1054">Pulcinella (A45 D56)' 
		+ '<Option value="2059">Pump Shotgun (A32 D22)' 
		+ '<Option value="220">Punch Knife (A21 D11)' 
		+ '<Option value="511">Purple Gang\'s Gun (A19 D30)' 
		+ '<Option value="986">Pyro Kit (A26 D53)' 
		+ '<Option value="5409">Quilled Wristguard (A71 D49)' 
		+ '<Option value="195">RA-92 (A29 D11)' 
		+ '<Option value="432">Rabid Parrot (A35 D28)' 
		+ '<Option value="2787">Raccoon (A60 D82)' 
		+ '<Option value="1112">Raccoon (A50 D67)' 
		+ '<Option value="404">Radio Controlled Detonator (A23 D16)' 
		+ '<Option value="1547">Raed Armored Sedan (A30 D47)' 
		+ '<Option value="666">Railgun (A51 D24)' 
		+ '<Option value="654">Railgun Barrel (A0 D0)' 
		+ '<Option value="601">Railroad Tie (A15 D29)' 
		+ '<Option value="2206">Rain Slick (A28 D48)' 
		+ '<Option value="5626">Rainbow Boa (A80 D50)' 
		+ '<Option value="455">Rainy Day (A38 D22)' 
		+ '<Option value="2013">Range Finder Rifle (A37 D54)' 
		+ '<Option value="299">Ranger Body Armor (A15 D38)' 
		+ '<Option value="1043">Rapier (A41 D35)' 
		+ '<Option value="2406">Rappelling Gear (A76 D36)' 
		+ '<Option value="1003">RAS-15 (A30 D18)' 
		+ '<Option value="1498">Rat Pack (A29 D60)' 
		+ '<Option value="2659">Raven (A53 D69)' 
		+ '<Option value="976">Raven Claw (A56 D27)' 
		+ '<Option value="5292">Razorback (A76 D38)' 
		+ '<Option value="1022">Razoritel Grenade Launcher (A34 D15)' 
		+ '<Option value="2476">Reaction Contraption (A85 D55)' 
		+ '<Option value="242">Really Bloody Mop (A22 D15)' 
		+ '<Option value="566">Rebel 2 (A40 D45)' 
		+ '<Option value="107">Reciprocating Saw (A26 D14)' 
		+ '<Option value="2203">Red 404 (A41 D82)' 
		+ '<Option value="569">Red Angel (A16 D49)' 
		+ '<Option value="2802">Red Angel (A49 D74)' 
		+ '<Option value="2090">Red Back Spider (A33 D53)' 
		+ '<Option value="413">Red Boa (A19 D38)' 
		+ '<Option value="737">Red Card (A35 D30)' 
		+ '<Option value="228">Red Coat (A8 D38)' 
		+ '<Option value="5373">Red Devil (A43 D81)' 
		+ '<Option value="848">Red Fox (A62 D26)' 
		+ '<Option value="4613">Red Kangaroo (A30 D53)' 
		+ '<Option value="5295">Red Scorpion (A36 D67)' 
		+ '<Option value="4475">Red XIV (A69 D51)' 
		+ '<Option value="704">Reef Shark (A55 D24)' 
		+ '<Option value="2140">Regalia Foxtrot (A34 D71)' 
		+ '<Option value="1569">Reinforced Bowler (A12 D21)' 
		+ '<Option value="276">Reinforced Cement Mixer (A38 D19)' 
		+ '<Option value="2208">Reinforced Leather (A36 D67)' 
		+ '<Option value="763">Reinforced Steel (A0 D0)' 
		+ '<Option value="2014">Reinforced Tuxedo (A28 D34)' 
		+ '<Option value="2066">Reinhardt and Otto (A57 D36)' 
		+ '<Option value="2457">Remorra Gray (A62 D34)' 
		+ '<Option value="410">Remote Controlled Sniper (A35 D20)' 
		+ '<Option value="34">Revolver (A3 D2)' 
		+ '<Option value="5333">Rex Enterra (A43 D54)' 
		+ '<Option value="2211">Rex Fang (A73 D35)' 
		+ '<Option value="2061">Rhinestone Cowboy (A33 D25)' 
		+ '<Option value="1770">Rhino Helmet (A71 D49)' 
		+ '<Option value="2118">Rhino Hide (A25 D58)' 
		+ '<Option value="1815">Rhinoceros (A20 D54)' 
		+ '<Option value="1773">Rhinoceros Beetle (A52 D72)' 
		+ '<Option value="2450">Rico\'s Revenge (A81 D37)' 
		+ '<Option value="1519">Riding Elephant (A18 D30)' 
		+ '<Option value="1925">Riding Hat (A48 D74)' 
		+ '<Option value="409">Rigged Model Airplane (A13 D41)' 
		+ '<Option value="643">Rigged Oil Tanker (A30 D57)' 
		+ '<Option value="641">Rigged Tanker Truck (A39 D29)' 
		+ '<Option value="602">Rigged Traffic Cone (A28 D19)' 
		+ '<Option value="970">Ring Gun (A46 D31)' 
		+ '<Option value="5503">Rio Police Uniform (A20 D35)' 
		+ '<Option value="86">Riot Gear (A12 D28)' 
		+ '<Option value="315">Riot Shield (A14 D26)' 
		+ '<Option value="2161">Ripper Assault Rifle (A57 D30)' 
		+ '<Option value="462">Rising Sun (A28 D46)' 
		+ '<Option value="2197">Rivet (A0 D0)' 
		+ '<Option value="995">RM Crumpet (A19 D15)' 
		+ '<Option value="605">Road Block Crew (A26 D38)' 
		+ '<Option value="1312">Road Rage (A55 D31)' 
		+ '<Option value="4460">Road Razor (A77 D35)' 
		+ '<Option value="2026">Road Tractor (A25 D33)' 
		+ '<Option value="1774">Roadster Rage (A53 D72)' 
		+ '<Option value="665">Robber\'s Utility Belt (A33 D41)' 
		+ '<Option value="2134">Robot Bomb Defuser (A34 D65)' 
		+ '<Option value="2488">Rock Iguana (A79 D50)' 
		+ '<Option value="2456">Rock Python (A58 D31)' 
		+ '<Option value="708">Rogue CIA Agent (A69 D30)' 
		+ '<Option value="552">Rolax Stealth (A18 D28)' 
		+ '<Option value="5349">Roman Legion (A74 D58)' 
		+ '<Option value="237">Roman Mace (A12 D28)' 
		+ '<Option value="124">Ronin Motorcycle (A36 D14)' 
		+ '<Option value="756">Royal Flush (A48 D25)' 
		+ '<Option value="1515">Royal Thai Army Beret (A28 D21)' 
		+ '<Option value="1520">Royal Thai Army Jeep (A38 D25)' 
		+ '<Option value="1546">Royal Thai Marine (A33 D49)' 
		+ '<Option value="1528">Royal Thai Police Tank (A58 D74)' 
		+ '<Option value="457">Royal White Elephant (A34 D48)' 
		+ '<Option value="17">RPG Launcher (A20 D12)' 
		+ '<Option value="307">Ru-357 Pistola (A26 D24)' 
		+ '<Option value="197">Ru-38 Pistol (A20 D24)' 
		+ '<Option value="257">RU-44 SMG (A36 D20)' 
		+ '<Option value="1001">RU-7 .45 Pistol (A25 D23)' 
		+ '<Option value="1019">Ru-78 Heavy Machine Gun (A36 D12)' 
		+ '<Option value="1812">Ruby Red (A38 D52)' 
		+ '<Option value="292">Russian Bear (A22 D45)' 
		+ '<Option value="560">Russian Car Part (A0 D0)' 
		+ '<Option value="565">Russian Dazatz 45 (A18 D46)' 
		+ '<Option value="600">Rusted Rebar (A28 D17)' 
		+ '<Option value="227">Saber (A17 D13)' 
		+ '<Option value="2138">Safety First (A65 D32)' 
		+ '<Option value="122">Samurai Helmet (A12 D28)' 
		+ '<Option value="123">Samurai Sword (A35 D15)' 
		+ '<Option value="2458">Sand Goggles (A37 D74)' 
		+ '<Option value="2020">Sand Storm (A29 D15)' 
		+ '<Option value="2318">Sand Tiger (A31 D65)' 
		+ '<Option value="2331">Sandman Vest (A36 D65)' 
		+ '<Option value="2467">Santa Slay (A42 D82)' 
		+ '<Option value="1534">Satellite Phone (A0 D0)' 
		+ '<Option value="208">Saturday Night Special (A18 D12)' 
		+ '<Option value="11059">Savage Suspenders (A69 D46)' 
		+ '<Option value="1706">Savanna Baboon (A25 D54)' 
		+ '<Option value="7031">Savannah Patroller (A82 D50)' 
		+ '<Option value="152">Sawed-off Double Barrel Shotgun (A35 D15)' 
		+ '<Option value="1508">Scalding Hot Tea (A26 D35)' 
		+ '<Option value="165">Scalper\'s Hatchet (A25 D5)' 
		+ '<Option value="259">Scarab 9mm Pistol (A32 D24)' 
		+ '<Option value="11064">Schooner (A55 D88)' 
		+ '<Option value="2452">Scissor Sister (A25 D51)' 
		+ '<Option value="1775">Scottish Wild Cat (A71 D50)' 
		+ '<Option value="5625">Screech Owl (A48 D78)' 
		+ '<Option value="1048">Scutum (A21 D38)' 
		+ '<Option value="2485">Scythe Chariot (A80 D80)' 
		+ '<Option value="5350">Sea Eagle (A74 D55)' 
		+ '<Option value="762">Security Camera (A0 D0)' 
		+ '<Option value="1808">Segmented Body Plate (A50 D31)' 
		+ '<Option value="10">Semi-Automatic Shotgun (A5 D4)' 
		+ '<Option value="509">Senza Pari (A21 D12)' 
		+ '<Option value="147">Sergeant Murphy\'s Cosh (A15 D15)' 
		+ '<Option value="979">Set of 2 Candles (A40 D28)' 
		+ '<Option value="933">Set of Ballistic Blades (A40 D68)' 
		+ '<Option value="2015">Set of Biker Leathers (A30 D48)' 
		+ '<Option value="438">Set of Black Roses (A20 D14)' 
		+ '<Option value="65">Set of Blackmail Photos (A0 D0)' 
		+ '<Option value="5021">Set of Cards (A0 D0)' 
		+ '<Option value="74">Set of Falsified Documents (A2 D30)' 
		+ '<Option value="230">Set of Fireworks (A24 D6)' 
		+ '<Option value="319">Set of Frankenstein Poker Chips (A22 D10)' 
		+ '<Option value="529">Set of High Powered Binoculars (A15 D21)' 
		+ '<Option value="231">Set of Illegal Fireworks (A35 D12)' 
		+ '<Option value="68">Set of Illegal Transaction Records (A0 D0)' 
		+ '<Option value="540">Set of Love Birds (A26 D53)' 
		+ '<Option value="1025">Set of Mansion Details (A0 D0)' 
		+ '<Option value="19">Set of Night Vision Goggles (A5 D16)' 
		+ '<Option value="187">Set of Pain & Suffering (A48 D16)' 
		+ '<Option value="1011">Set of Photos of Karpov (A0 D0)' 
		+ '<Option value="623">Set of Pocket Rockets (A51 D30)' 
		+ '<Option value="384">Set of Prison Stripes (A15 D24)' 
		+ '<Option value="880">Set of Roaring 20\'s (A35 D62)' 
		+ '<Option value="984">Set of Terrible Twos (A64 D40)' 
		+ '<Option value="3006">Set of Throwing Spikes (A45 D66)' 
		+ '<Option value="5020">Set of Tokens (A0 D0)' 
		+ '<Option value="538">Set of Twin AK-47s (A52 D26)' 
		+ '<Option value="539">Set of Twin Automatic Rifles (A51 D27)' 
		+ '<Option value="537">Set of Twin Garza 9s (A53 D24)' 
		+ '<Option value="341">Set of Veteran Dog Tags (A40 D42)' 
		+ '<Option value="729">Set of Z4 Infiltrator Gear (A36 D57)' 
		+ '<Option value="1525">Seua Daao Sub (A35 D22)' 
		+ '<Option value="1008">Severnyy Olen Snowbike (A32 D20)' 
		+ '<Option value="857">Shadow Transporter (A77 D60)' 
		+ '<Option value="612">Shamrock (A16 D21)' 
		+ '<Option value="525">Shaped Charge (A51 D25)' 
		+ '<Option value="7048">Sharing Thoughts (A67 D42)' 
		+ '<Option value="774">Shark Tooth Club (A58 D31)' 
		+ '<Option value="830">Shaw\'s Submarine (A63 D35)' 
		+ '<Option value="1017">Shchuka Speed Boat (A36 D22)' 
		+ '<Option value="1776">Sheet Metal Blade (A79 D63)' 
		+ '<Option value="1924">Shiner (A46 D74)' 
		+ '<Option value="536">Shipping Container (A0 D0)' 
		+ '<Option value="4612">Showboat (A49 D41)' 
		+ '<Option value="712">Showman (A46 D27)' 
		+ '<Option value="1904">ShrapShield (A59 D30)' 
		+ '<Option value="1020">Shturmovik (A45 D28)' 
		+ '<Option value="674">Shuttlecock Grenade (A22 D14)' 
		+ '<Option value="181">Si-14 Cargo Plane (A31 D31)' 
		+ '<Option value="286">Siberian Tiger (A36 D14)' 
		+ '<Option value="2438">Sidewinder (A40 D79)' 
		+ '<Option value="2453">Signal Scrambler (A52 D26)' 
		+ '<Option value="33">Silenced Pistol (A18 D16)' 
		+ '<Option value="646">Silenced Sniper Rifle (A70 D28)' 
		+ '<Option value="4458">Silent Thunder (A46 D74)' 
		+ '<Option value="1513">Silk Scarf (A20 D22)' 
		+ '<Option value="969">Silk Thunder (A84 D59)' 
		+ '<Option value="954">Silverback (A36 D68)' 
		+ '<Option value="683">Silverback Gorilla (A35 D57)' 
		+ '<Option value="1777">Simian Safeguard (A43 D58)' 
		+ '<Option value="989">Sin City Shooter (A81 D36)' 
		+ '<Option value="11056">Sinker (A83 D54)' 
		+ '<Option value="631">Sirroco 9Z (A46 D15)' 
		+ '<Option value="2091">SK 7 Shorty (A54 D34)' 
		+ '<Option value="2649">Skeleton Costume (A29 D31)' 
		+ '<Option value="1810">Skull Cap (A28 D51)' 
		+ '<Option value="3520">Slacker Jack (A0 D0)' 
		+ '<Option value="734">Slap Shot (A22 D16)' 
		+ '<Option value="7049">Slate Knife (A44 D68)' 
		+ '<Option value="652">Sled and Dogs (A53 D25)' 
		+ '<Option value="2322">Sleek (A35 D37)' 
		+ '<Option value="715">Sleek Bulletproof Vest (A45 D23)' 
		+ '<Option value="2189">Sleek Torso Guard (A44 D46)' 
		+ '<Option value="892">Sleeper Shot (A43 D73)' 
		+ '<Option value="2403">Sleeved Armored Vest (A37 D81)' 
		+ '<Option value="2330">Slicer Pistol (A73 D43)' 
		+ '<Option value="2704">Slipstream (A44 D78)' 
		+ '<Option value="1574">Slot Machine (A0 D0)' 
		+ '<Option value="2154">Sloth (A65 D33)' 
		+ '<Option value="80">SMG (A23 D22)' 
		+ '<Option value="2672">Smiley (A37 D51)' 
		+ '<Option value="11060">Smoke Eater (A86 D56)' 
		+ '<Option value="11058">Smoking Jacket (A48 D74)' 
		+ '<Option value="5701">Smuggler\'s Sub (A86 D58)' 
		+ '<Option value="1752">Snake Fang (A61 D61)' 
		+ '<Option value="1707">Snapping Turtle (A56 D25)' 
		+ '<Option value="1920">Snarler (A68 D44)' 
		+ '<Option value="1909">Sneak (A38 D72)' 
		+ '<Option value="316">Sneak Attack (A43 D22)' 
		+ '<Option value="42">Sniper Rifle (A22 D21)' 
		+ '<Option value="971">Snow Crawler (A29 D47)' 
		+ '<Option value="1778">Snow Drift (A54 D72)' 
		+ '<Option value="398">Snow Fort (A7 D25)' 
		+ '<Option value="428">Snow Leopard (A37 D25)' 
		+ '<Option value="2788">Snow Monkey (A62 D83)' 
		+ '<Option value="1113">Snow Monkey (A52 D71)' 
		+ '<Option value="1562">Snow Monster (A62 D30)' 
		+ '<Option value="1750">Snow Resist Layer (A59 D63)' 
		+ '<Option value="437">Snowboard (A8 D22)' 
		+ '<Option value="2468">Snowdrift (A83 D38)' 
		+ '<Option value="2469">Snowflake (A40 D83)' 
		+ '<Option value="255">Snub-Nose Revolver (A18 D16)' 
		+ '<Option value="291">Sodium Pentothal (A25 D4)' 
		+ '<Option value="564">Solar Flare (A34 D34)' 
		+ '<Option value="571">Solar Panel (A0 D0)' 
		+ '<Option value="899">Sonar Buoy (A37 D74)' 
		+ '<Option value="670">Sonic Emitter (A0 D0)' 
		+ '<Option value="1840">Sonic Five (A32 D30)' 
		+ '<Option value="2448">Sonny\'s Suit (A42 D81)' 
		+ '<Option value="1851">South African Ball (A17 D35)' 
		+ '<Option value="1852">South Korean Ball (A34 D18)' 
		+ '<Option value="2673">Southern Stingray (A52 D35)' 
		+ '<Option value="775">Southhall Sedan (A32 D58)' 
		+ '<Option value="2470">Southlander (A43 D30)' 
		+ '<Option value="5351">Spaghetti Western (A39 D65)' 
		+ '<Option value="2104">Spanish 44 Caliber (A64 D31)' 
		+ '<Option value="295">Spare (A21 D21)' 
		+ '<Option value="2414">Spear Storm (A76 D34)' 
		+ '<Option value="343">Spetsnaz Operative (A38 D32)' 
		+ '<Option value="2507">Spider Eater (A50 D28)' 
		+ '<Option value="7024">Spider Monkey (A42 D62)' 
		+ '<Option value="1709">Spiked Baton (A58 D28)' 
		+ '<Option value="4473">Spinal Jacket (A73 D32)' 
		+ '<Option value="5613">Spine Studded Jacket (A50 D66)' 
		+ '<Option value="500">Spitting Cobra (A46 D28)' 
		+ '<Option value="5321">Spitting Spider (A35 D50)' 
		+ '<Option value="2432">Split Aces (A29 D56)' 
		+ '<Option value="2110">Spoleto (A71 D39)' 
		+ '<Option value="1785">Sports Fanatic (A74 D39)' 
		+ '<Option value="1818">Sports Fanatic (A77 D42)' 
		+ '<Option value="1819">Sports Fanatic (A80 D45)' 
		+ '<Option value="1820">Sports Fanatic (A84 D49)' 
		+ '<Option value="2323">Sportster (A52 D46)' 
		+ '<Option value="2806">Sportster (A82 D62)' 
		+ '<Option value="2792">Spotted Vest (A79 D59)' 
		+ '<Option value="1116">Spotted Vest (A64 D51)' 
		+ '<Option value="4584">Sprinting Shoes (A25 D32)' 
		+ '<Option value="4594">Spur Tortoise (A26 D43)' 
		+ '<Option value="883">Spy (A62 D44)' 
		+ '<Option value="727">Spy Plane (A31 D58)' 
		+ '<Option value="116">St. Patty\'s Shillelagh (A25 D25)' 
		+ '<Option value="87">St. Valentine\'s Shotgun (A24 D22)' 
		+ '<Option value="8">Stab-Proof Vest (A2 D5)' 
		+ '<Option value="759">Stage Show Tiger (A28 D50)' 
		+ '<Option value="2018">Stake Bed Truck (A20 D38)' 
		+ '<Option value="724">Stealth Car (A41 D23)' 
		+ '<Option value="5308">Steel Apron (A42 D75)' 
		+ '<Option value="1941">Steel Curtain (A21 D45)' 
		+ '<Option value="1576">Steel Girder (A0 D0)' 
		+ '<Option value="5370">Steel Plate Greaves (A37 D72)' 
		+ '<Option value="5286">Steel Plate Jacket (A42 D70)' 
		+ '<Option value="5322">Steel Toe Boots (A20 D55)' 
		+ '<Option value="777">Steller Sea Lion (A29 D59)' 
		+ '<Option value="452">Stock Car (A39 D22)' 
		+ '<Option value="2148">Stockholm Pro (A68 D40)' 
		+ '<Option value="90">Stolen Mail Truck (A10 D20)' 
		+ '<Option value="393">Stolen Police Car (A21 D39)' 
		+ '<Option value="1130">Storm Chaser (A73 D30)' 
		+ '<Option value="2795">Stout Shoulders (A65 D85)' 
		+ '<Option value="1119">Stout Shoulders (A58 D77)' 
		+ '<Option value="204">Street Gang Member (A20 D14)' 
		+ '<Option value="4461">Stretch Classic (A31 D78)' 
		+ '<Option value="77">Stretch Limo (A16 D37)' 
		+ '<Option value="2146">Strike Breaker (A39 D69)' 
		+ '<Option value="7050">Strike Soldier (A40 D68)' 
		+ '<Option value="739">Striker (A47 D35)' 
		+ '<Option value="528">String of Firecrackers (A33 D46)' 
		+ '<Option value="2794">Strong Arm (A84 D68)' 
		+ '<Option value="1118">Strong Arm (A73 D56)' 
		+ '<Option value="1129">Structural Damage (A32 D72)' 
		+ '<Option value="357">Stuffed Turkey (A19 D25)' 
		+ '<Option value="504">Stun Baton (A24 D17)' 
		+ '<Option value="85">Sub Machine Gun (A24 D22)' 
		+ '<Option value="1847">Sudden Death (A20 D10)' 
		+ '<Option value="11057">Sugar Daddy (A91 D61)' 
		+ '<Option value="755">Suit of Suits (A46 D24)' 
		+ '<Option value="2459">Sultan\'s Saber (A75 D37)' 
		+ '<Option value="906">Sumatra Tiger (A60 D30)' 
		+ '<Option value="495">Sumotori Fighter (A17 D25)' 
		+ '<Option value="2484">Sun Spider (A61 D85)' 
		+ '<Option value="581">Supercharged 4x4 (A27 D14)' 
		+ '<Option value="579">Supercharged CM Seta (A16 D29)' 
		+ '<Option value="583">Supercharged CM Venga (A29 D17)' 
		+ '<Option value="582">Supercharged Dvina (A28 D18)' 
		+ '<Option value="593">Supercharged El Rey Roadster (A46 D32)' 
		+ '<Option value="580">Supercharged Escalade (A13 D30)' 
		+ '<Option value="596">Supercharged Fugama Hasu (A51 D27)' 
		+ '<Option value="589">Supercharged Gold-Plated RUF (A37 D16)' 
		+ '<Option value="584">Supercharged GX9 (A30 D15)' 
		+ '<Option value="885">Supercharged Hearse (A28 D61)' 
		+ '<Option value="587">Supercharged Le Tigre (A26 D38)' 
		+ '<Option value="595">Supercharged Low Rider Vehicle (A19 D50)' 
		+ '<Option value="586">Supercharged Mara Serpiente (A21 D37)' 
		+ '<Option value="590">Supercharged Montaine 320 (A38 D12)' 
		+ '<Option value="578">Supercharged Sedan (A15 D28)' 
		+ '<Option value="592">Supercharged Stock Car (A45 D24)' 
		+ '<Option value="591">Supercharged Trio Mesa (A25 D44)' 
		+ '<Option value="594">Supercharged Trio Wildfire GT (A29 D49)' 
		+ '<Option value="588">Supercharged V8 (A36 D17)' 
		+ '<Option value="585">Supercharged Veyron (A20 D36)' 
		+ '<Option value="1717">Sure Fire (A33 D16)' 
		+ '<Option value="434">Surprise Mobile (A11 D23)' 
		+ '<Option value="947">Survival Canteen (A21 D41)' 
		+ '<Option value="5508">Survival Light (A20 D37)' 
		+ '<Option value="682">Survival Pack (A22 D15)' 
		+ '<Option value="952">Survival Pack (A48 D25)' 
		+ '<Option value="1839">Suspension Coil (A0 D0)' 
		+ '<Option value="636">Suspicious Package (A30 D18)' 
		+ '<Option value="2127">Swamp Buggy (A72 D32)' 
		+ '<Option value="2124">Swamp Camo (A48 D27)' 
		+ '<Option value="206">SWAT Van (A7 D26)' 
		+ '<Option value="1552">Swiss Banker (A27 D54)' 
		+ '<Option value="5339">Swiss Guard (A59 D69)' 
		+ '<Option value="5615">Swiss Pike (A42 D76)' 
		+ '<Option value="215">Switchblade (A14 D16)' 
		+ '<Option value="545">Synthetic Steel (A18 D52)' 
		+ '<Option value="4611">Tactical Hatchet (A50 D35)' 
		+ '<Option value="6">Tactical Shotgun (A3 D2)' 
		+ '<Option value="1013">Taiga Combat Shotgun (A32 D20)' 
		+ '<Option value="8079">Tail Gunner (A36 D76)' 
		+ '<Option value="8080">Tail Gunner (A37 D80)' 
		+ '<Option value="8081">Tail Gunner (A39 D82)' 
		+ '<Option value="297">Taino Vomit Stick (A36 D22)' 
		+ '<Option value="2667">Tainted Blades (A35 D74)' 
		+ '<Option value="2705">Talon (A79 D44)' 
		+ '<Option value="1506">Tanto (A43 D28)' 
		+ '<Option value="7023">Tarantula (A53 D30)' 
		+ '<Option value="562">Tasmanian (A36 D34)' 
		+ '<Option value="2098">Tasmanian Devil (A53 D38)' 
		+ '<Option value="2353">Tax Collector (A52 D82)' 
		+ '<Option value="603">Taxi Cab (A37 D24)' 
		+ '<Option value="1541">Tea Leaf (A27 D51)' 
		+ '<Option value="5340">Templar Hammer (A42 D61)' 
		+ '<Option value="5341">Templar Shield (A62 D42)' 
		+ '<Option value="505">Temple Guardian (A27 D45)' 
		+ '<Option value="949">Tent Peg and Hammer (A40 D24)' 
		+ '<Option value="1050">Teppista (A47 D29)' 
		+ '<Option value="1911">Terrapin Body Armor (A31 D63)' 
		+ '<Option value="4609">Terrarium (A0 D0)' 
		+ '<Option value="301">Tesla PD Gun (A18 D42)' 
		+ '<Option value="882">Tetanus (A39 D63)' 
		+ '<Option value="1537">Thai Baht (A0 D0)' 
		+ '<Option value="561">Thai Car Part (A0 D0)' 
		+ '<Option value="567">Thai XS Max (A45 D35)' 
		+ '<Option value="3518">The Kid (A0 D0)' 
		+ '<Option value="3519">The Professional (A0 D0)' 
		+ '<Option value="738">The Wall (A23 D39)' 
		+ '<Option value="2207">Thermal Shielding (A57 D30)' 
		+ '<Option value="1929">Thermobaric Hand Grenade (A81 D50)' 
		+ '<Option value="1128">Thief (A71 D32)' 
		+ '<Option value="1782">Thigh Will Be Done (A74 D30)' 
		+ '<Option value="1868">Thigh Will Be Done (A77 D33)' 
		+ '<Option value="1869">Thigh Will Be Done (A81 D36)' 
		+ '<Option value="630">Thugs Bunny (A50 D28)' 
		+ '<Option value="186">Tiburon (A38 D30)' 
		+ '<Option value="1843">Tiebreaker (A76 D42)' 
		+ '<Option value="2666">Tiger Claw (A73 D56)' 
		+ '<Option value="1518">Tiger Sak Yant (A65 D42)' 
		+ '<Option value="287">Tiger Tank (A18 D48)' 
		+ '<Option value="285">Tigershark Submersible (A37 D18)' 
		+ '<Option value="282">Tigerskin Armored Vest (A12 D30)' 
		+ '<Option value="2502">Tiki Mask (A62 D35)' 
		+ '<Option value="379">Timber Wolf (A41 D20)' 
		+ '<Option value="1047">Tirapugni (A38 D51)' 
		+ '<Option value="162">Tire Iron (A18 D15)' 
		+ '<Option value="1543">Titanium Katar (A35 D50)' 
		+ '<Option value="494">Titanium Keris Knife (A26 D15)' 
		+ '<Option value="1544">Titanium Mesh Jacket (A31 D46)' 
		+ '<Option value="972">Titus 350 (A48 D24)' 
		+ '<Option value="1779">Tlingit Parka (A64 D81)' 
		+ '<Option value="203">TNT (A42 D20)' 
		+ '<Option value="5291">Toaster (A34 D73)' 
		+ '<Option value="871">Toco Toucan (A35 D81)' 
		+ '<Option value="354">Tomahawk (A23 D19)' 
		+ '<Option value="416">Tommy Gun Ornament (A20 D13)' 
		+ '<Option value="651">Tony Montana Suit (A24 D52)' 
		+ '<Option value="2139">Top Heavy (A30 D59)' 
		+ '<Option value="281">Tora Assault Rifle (A28 D12)' 
		+ '<Option value="2337">Tornado (A70 D39)' 
		+ '<Option value="1945">Total Eclipse (A76 D45)' 
		+ '<Option value="2668">Toxic Gas Scrubber (A74 D37)' 
		+ '<Option value="629">Toy Box Car (A24 D14)' 
		+ '<Option value="262">Track Loader (A37 D32)' 
		+ '<Option value="1055">Tradire (A32 D28)' 
		+ '<Option value="309">Traje de Balas (A10 D39)' 
		+ '<Option value="2198">Transport Chopper (A69 D32)' 
		+ '<Option value="521">Trauma Chopper (A21 D34)' 
		+ '<Option value="328">Treat Bag (A18 D15)' 
		+ '<Option value="2333">Tree Feller (A34 D68)' 
		+ '<Option value="146">Trench Knife (A16 D14)' 
		+ '<Option value="768">Trio Berella (A32 D23)' 
		+ '<Option value="717">Trio Diva (A25 D45)' 
		+ '<Option value="1315">Trio Incarnate (A84 D39)' 
		+ '<Option value="414">Trio Mesa (A16 D34)' 
		+ '<Option value="568">Trio Napoli (A47 D23)' 
		+ '<Option value="1906">Trio Regency (A66 D33)' 
		+ '<Option value="573">Trio Soprano (A53 D26)' 
		+ '<Option value="380">Trio Wildfire GT (A18 D43)' 
		+ '<Option value="638">Trip Wire Bomb (A32 D19)' 
		+ '<Option value="224">Tri-Point Hat (A8 D12)' 
		+ '<Option value="1826">Trouble Maker (A55 D46)' 
		+ '<Option value="694">Trusty 9 Iron (A20 D18)' 
		+ '<Option value="2340">Tsunami (A43 D81)' 
		+ '<Option value="7028">Tundra Commmando (A55 D79)' 
		+ '<Option value="1561">Tundra SMG (A37 D61)' 
		+ '<Option value="1938">Tundra Wolf (A37 D68)' 
		+ '<Option value="1813">Turbo Road Warrior (A51 D35)' 
		+ '<Option value="350">Turkey Silencer (A28 D13)' 
		+ '<Option value="709">Turkey Vulture (A62 D50)' 
		+ '<Option value="870">Turnabout (A42 D80)' 
		+ '<Option value="2012">Two Pair (A31 D44)' 
		+ '<Option value="125">Type 100 SMG (A30 D10)' 
		+ '<Option value="1507">Type-103 Machine Gun (A42 D29)' 
		+ '<Option value="1032">Ubijca Assault Rifle (A43 D18)' 
		+ '<Option value="402">Ugly Sweater (A15 D18)' 
		+ '<Option value="5510">Ultralight (A21 D42)' 
		+ '<Option value="663">Ultrasonic Gun (A22 D48)' 
		+ '<Option value="2640">Un Tuono (A60 D49)' 
		+ '<Option value="172">Uncle Motts\' Cargo Truck (A22 D14)' 
		+ '<Option value="993">Uncle Sam (A34 D61)' 
		+ '<Option value="2147">Union Leader (A67 D38)' 
		+ '<Option value="11051">Union Worker (A0 D0)' 
		+ '<Option value="64">Untraceable Cell Phone (A0 D0)' 
		+ '<Option value="730">Urban Night Fighter (A55 D39)' 
		+ '<Option value="1857">Uruguay Ball (A36 D17)' 
		+ '<Option value="1853">USA Ball (A35 D16)' 
		+ '<Option value="138">Ushanka (A10 D20)' 
		+ '<Option value="346">Utility Belt (A30 D30)' 
		+ '<Option value="1309">Utility Vest (A26 D50)' 
		+ '<Option value="391">V8 (A13 D26)' 
		+ '<Option value="1040">Vachelli CP (A42 D18)' 
		+ '<Option value="2650">Vampire Bat (A67 D34)' 
		+ '<Option value="2651">Vampire Costume (A58 D28)' 
		+ '<Option value="1044">Venetian Blinder (A30 D52)' 
		+ '<Option value="2669">Venomous (A75 D34)' 
		+ '<Option value="2064">Ventilated Blast Cap (A32 D24)' 
		+ '<Option value="5312">Venture Axe (A30 D72)' 
		+ '<Option value="157">Veyron (A17 D24)' 
		+ '<Option value="2184">Vice (A0 D0)' 
		+ '<Option value="689">Vicious Anaconda (A20 D42)' 
		+ '<Option value="692">Vicious Cobra (A30 D55)' 
		+ '<Option value="685">Vicious Hyena (A28 D29)' 
		+ '<Option value="690">Vicious Kodiak (A41 D24)' 
		+ '<Option value="686">Vicious Parrot (A18 D31)' 
		+ '<Option value="687">Vicious Scorpion (A34 D12)' 
		+ '<Option value="691">Vicious Tiger (A52 D34)' 
		+ '<Option value="688">Vicious Wolf (A39 D30)' 
		+ '<Option value="348">Viking Helmet (A21 D37)' 
		+ '<Option value="888">Vindicator (A49 D25)' 
		+ '<Option value="214">Vintage Cruiser (A7 D26)' 
		+ '<Option value="79">Violin Case Machine Gun (A23 D22)' 
		+ '<Option value="757">Viva Las Vegas (A27 D50)' 
		+ '<Option value="1016">Volk Luxury Sedan (A24 D36)' 
		+ '<Option value="338">Vortex Ring Gun (A12 D33)' 
		+ '<Option value="139">VSK-94 Sniper Rifle (A28 D12)' 
		+ '<Option value="2354">W2 (A84 D53)' 
		+ '<Option value="401">Waffle Iron (A14 D23)' 
		+ '<Option value="556">Wagner KP8 (A51 D26)' 
		+ '<Option value="2317">Wake Breaker (A36 D72)' 
		+ '<Option value="5622">War Kilt (A46 D74)' 
		+ '<Option value="2425">War Rhino (A72 D31)' 
		+ '<Option value="780">War Wagon (A77 D43)' 
		+ '<Option value="2784">Warthog (A74 D60)' 
		+ '<Option value="994">Washington\'s Sword (A24 D61)' 
		+ '<Option value="2329">Wasper Knife (A51 D51)' 
		+ '<Option value="2801">Wasper Knife (A85 D65)' 
		+ '<Option value="1303">Water Born Tank (A65 D33)' 
		+ '<Option value="531">Water Gun (A18 D12)' 
		+ '<Option value="1057">Water Taxi (A19 D42)' 
		+ '<Option value="2641">Water Truck (A45 D64)' 
		+ '<Option value="951">Waterproof Poncho (A22 D47)' 
		+ '<Option value="668">Weapon Part (A0 D0)' 
		+ '<Option value="7027">Web Climbing Rope (A60 D45)' 
		+ '<Option value="895">Weight Vest (A34 D57)' 
		+ '<Option value="4583">Welding Mask (A30 D25)' 
		+ '<Option value="5374">Wendigo (A83 D50)' 
		+ '<Option value="2126">Wetland Guide (A34 D71)' 
		+ '<Option value="850">Whiplash (A69 D29)' 
		+ '<Option value="4477">White Knuckle Express (A44 D70)' 
		+ '<Option value="265">White Shturmovik (A45 D28)' 
		+ '<Option value="2133">White Tailed Deer (A23 D50)' 
		+ '<Option value="330">Whaambulance (A28 D5)' 
		+ '<Option value="541">Widow Maker (A27 D52)' 
		+ '<Option value="2086">Wild Boar (A43 D43)' 
		+ '<Option value="170">Wild Mustang (A16 D34)' 
		+ '<Option value="2789">Wildebeest (A85 D64)' 
		+ '<Option value="1114">Wildebeest (A74 D54)' 
		+ '<Option value="887">Windguard Helmet (A27 D48)' 
		+ '<Option value="2703">Windswept (A78 D43)' 
		+ '<Option value="617">Winner\'s Wreath (A27 D38)' 
		+ '<Option value="5022">Wiretap Device (A0 D0)' 
		+ '<Option value="2653">Witch Costume (A60 D29)' 
		+ '<Option value="1304">Wolf Pack (A66 D35)' 
		+ '<Option value="109">Wood Chipper (A33 D17)' 
		+ '<Option value="2095">Woodsman (A27 D54)' 
		+ '<Option value="1905">Woodsman 22 (A24 D63)' 
		+ '<Option value="2155">Wrath (A35 D66)' 
		+ '<Option value="1564">WWI German Armor (A26 D57)' 
		+ '<Option value="1568">WWII M4 Sherman (A80 D41)' 
		+ '<Option value="2167">X-22 Peregrine (A53 D34)' 
		+ '<Option value="828">X-Men Blackbird (A33 D62)' 
		+ '<Option value="825">X-Men Crest (A32 D62)' 
		+ '<Option value="829">X-Men Suit (A51 D51)' 
		+ '<Option value="2111">Yak (A74 D43)' 
		+ '<Option value="5294">Yellow Sea Snake (A64 D40)' 
		+ '<Option value="1702">Yeti Snow Cruiser (A63 D26)' 
		+ '<Option value="459">YetiSkin Ghillie Suit (A26 D43)' 
		+ '<Option value="497">Yin Yang (A34 D17)' 
		+ '<Option value="2082">Yo Eleven (A24 D16)' 
		+ '<Option value="321">YoZombie (A21 D18)' 
		+ '<Option value="877">Z17 Micro (A69 D45)' 
		+ '<Option value="728">Z4 Night Prowler (A57 D35)' 
		+ '<Option value="289">Zeppelin (A18 D36)' 
		+ '<Option value="1806">Zeus (A54 D18)' 
		+ '<Option value="210">Zip Gun (A24 D16)' 
		+ '<Option value="575">Zip Line (A15 D20)' 
		+ '<Option value="1308">Zipper S10 (A49 D29)' 
		+ '<Option value="1034">Zmeya Carbon Blade (A28 D44)' 
		+ '<Option value="1030">Zoloto Sports Car (A43 D22)' 
		+ '<Option value="2652">Zombie Costume (A27 D59)' 
		+ '<Option value="324">Zombie Cow (A25 D15)' 
		+ '<Option value="2713">Zorse (A81 D66)' 
		+ '<Option value="1035">ZPR Pulemet (A28 D65)' 
		+ '<Option value="129">AA-12 Auto Shotgun (A27 D15)';


	var boosts_list = '<option style="color:#33FF00;" value="QueueSet_63"><< ALL BOOSTS >>'
		+ '<option style="color:#33FF00;" value="QueueSet_22">-- Special Boosts --' 
			+ '<option value="101">Augmenter (2x Loot Missions)'
			+ '<option value="115">Double Loot (2x Loot)'
			+ '<option value="98">Rob Squad (Rob Entire Board)' 
			+ '<option value="107">Vitals Sight (+200% chance of robbing)'
			+ '<option value="118">Sheriff Badge (+150% chance of robbing)'
			+ '<option value="121">Cupid\'s Arrow (+150% chance of robbing)'
			+ '<option value="124">Snake Venom (+150% chance of robbing)'
			+ '<option value="127">Chatterbox (+150% chance of robbing)'
			+ '<option value="130">Ship\'s wheel (+150% chance of robbing)'
		+ '<option style="color:#33FF00;" value="QueueSet_22">-- Attack Boosts --' 
			+ '<option value="128">Deck Chair (+130 Attack)'
			+ '<option value="125">Whoopee Cushion (+130 Attack)'
			+ '<option value="122">Green Beer (+130 Attack)'
			+ '<option value="119">Red Rose (+130 Attack)'
			+ '<option value="116">Gold Bar (+130 Attack)' 
			+ '<option value="106">Arrow Shaft (+125 Attack)' 
			+ '<option value="56">Black Market Ammo (+32 Attack)' 
			+ '<option value="80">Blackjack (+80 Attack)' 
			+ '<option value="19">Blowfish Dart (+40 Attack)' 
			+ '<option value="46">Bola (+45 Attack)' 
			+ '<option value="47">Car Bomb (+50 Attack)' 
			+ '<option value="50">Champagne Bottle (+25 Attack)' 
			+ '<option value="54">Chisel (+34 Attack)' 
			+ '<option value="13">Corporate Muscle (+35 Attack)' 
			+ '<option value="60">Dead Man\'s Hand (+90 Attack)' 
			+ '<option value="62">Fire Ants (+50 Attack)' 
			+ '<option value="16">Flaming Shot (+30 Attack)' 
			+ '<option value="64">Glass Knuckles (+100 Attack)' 
			+ '<option value="30">Handy Man (+38 Attack)' 
			+ '<option value="32">Hollow Points (+100 Attack)' 
			+ '<option value="26">Hot Coffee (+5 Attack)' 
			+ '<option value="42">Liquid Courage (+44 Attack)' 
			+ '<option value="6">Semi-Pro Boxer (+15 Attack)' 
			+ '<option value="58">Snake Eyes (+70 Attack)' 
			+ '<option value="83">Swordfish (+100 Attack)' 
			+ '<option value="8">Sting Grenade (+20 Attack)' 
			+ '<option value="31">Throwing Knives (+65 Attack)' 
			+ '<option value="52">War Paint (+32 Attack)'
		+ '<option style="color:#33FF00;" value="QueueSet_19">-- Defense Boosts --' 
			+ '<option value="129">Wooden Oar (+130 Defense)'
			+ '<option value="126">Whipped Cream Can (+130 Defense)'
			+ '<option value="123">Pot of Gold (+130 Defense)'
			+ '<option value="120">Candied Grenade Pin (+130 Defense)'
			+ '<option value="117">Wanted Poster (+130 Defense)'
			+ '<option value="79">Protective Suit (+50 Defense)'
			+ '<option value="43">Berlin Wall Section (+46 Defense)' 
			+ '<option value="82">Bottle Of Olive Oil (+100 Defense)' 
			+ '<option value="33">Boxer (+38 Defense)' 
			+ '<option value="4">Bulldog (+18 Defense)' 
			+ '<option value="34">Bullet Stopper (+65 Defense)' 
			+ '<option value="63">Caltrops (+100 Defense)' 
			+ '<option value="25">Extra Pair of Eyes (+3 Defense)' 
			+ '<option value="48">Flash Bang (+40 Defense)' 
			+ '<option value="57">Hyper Alert Sentry (+32 Defense)' 
			+ '<option value="11">Injunction (+25 Defense)' 
			+ '<option value="61">Mint on the Pillow (+120 Defense)' 
			+ '<option value="35">Mr. Hot Sauce (+100 Defense)' 
			+ '<option value="53">Pepper Spray (+36 Defense)' 
			+ '<option value="79">Protective Suit (+50 Defense)' 
			+ '<option value="105">Quiver (+125 Defense)' 
			+ '<option value="18">Sandbag Wall (+35 Defense)' 
			+ '<option value="14">Shave & A Haircut (+30 Defense)' 
			+ '<option value="49">Smoke Grenade (+45 Defense)' 
			+ '<option value="1">Tripwire (+10 Defense)' 
			+ '<option value="28">Temporary Tattoo (+42 Defense)'
		+ '<option style="color:#33FF00;" value="QueueSet_11">-- Robbing Defense Boosts --' 
			+ '<option value="3">Alarm System (+15 Rob Defense)' 
			+ '<option value="81">Bottle of Wine (+150 Rob Defense)' 
			+ '<option value="9">Bouncer (+27 Rob Defense)' 
			+ '<option value="12">Motion Detector (+37 Rob Defense)' 
			+ '<option value="20">Hobo Lookout (+60 Rob Defense)' 
			+ '<option value="36">Lookout (+55 Rob Defense)' 
			+ '<option value="27">Mutt (+5 Rob Defense)' 
			+ '<option value="59">Gourmet Oysters (+120 Rob Defense)' 
			+ '<option value="41">Political Favor (+60 Rob Defense)' 
			+ '<option value="37">Reinforced Door (+106 Rob Defense)' 
			+ '<option value="38">Surveillance Camera (+154 Rob Defense)'
		+ '<option style="color:#33FF00;" value="QueueSet_2">-- Money Boosts --' 
			+ '<option value="55">Boutonniere (+10% Money)' 
			+ '<option value="45">Money Sock (+50% Money)';
			
		
	var loot_sort_cat = '<option value="Parts">Parts' 
			+ '<option value="Consum">Consumables'
			+ '<option value="Top10">Top 10 Loot'
			+ '<option value="AZloot">A-Z Loot'
			+ '<option value="AttackDesc">Attack 70\< Loot'
			+ '<option value="DefenseDesc">Defense 70\< Loot'
			+ '<option value="CombinedDesc">Combined 130\< Loot'
			+ '<option value="LondonParts">London Parts'
			+ '<option value="Chicago">Chicago Loot'
			+ '<option value="Brazil">Brazil Loot'
			+ '<option value="Italy">Italy Loot'
			+ '<option value="Las Vegas">Las Vegas Loot'
			+ '<option value="Bangkok">Bangkok Loot'
			+ '<option value="Moscow">Moscow Loot'
			+ '<option value="Cuba">Cuba Loot'
			+ '<option value="NY">New York Loot'
			+ '<option value="Special Event">Special Event'
			+ '<option value="Fight">Fight Loot'
			+ '<option value="War">War Loot'
			+ '<option value="Gifting">Gifting Loot'
			+ '<option value="Mission">Nission Loot'
			+ '<option value="Property Loot">Property Loot'
			+ '<option value="Secret Stash">Secret Stash Loot'
			+ '<option value="Marketplace">Marketplace Loot'
			+ '<option value="Misc Loot">Misc Loot'
			+ '<option value="Henchmen">Henchmen Loot';
	
	var part_loot = london_parts 
				+ chicago_parts
				+ weapon_set
				+ weapon_parts
				+ zoo_parts 
				+ animal_parts 
				+ armory_parts
				+ armory_set
				+ chopshop_set
				+ chopshop_parts
				+ vegas_parts 
				+ vegas_set;
	
	var styles = '<style type="text/css">' 
		+ '.sexy_table1{font-weight:bold; border: 1px solid #666666; padding-left:10px; background-color:black}' 
		+ '.sexy_menu1{font-weight:bold; background-color:black; padding-left:0px; padding-top:0px; padding-bottom:0px; padding-right:0px}' 
		+ '.sexy_error_table{font-size:17px; color:red; padding-left:10px}' 
		+ '.sexy_select{font-weight:bold; color:#D0D0D0; border: 1px solid #666666; background-color:black; width:100%; font-size:15px; }' 
		+ '.sexy_input{background-color:black; color:#D0D0D0; font-size:15px; font-weight:bold; border: 1px solid #666666; padding-left:0.2em}' 
		+ '.sexy_start_gift{background:black; height:25px; border-width:0.5px; width:150px; font-weight:bold; color: rgb(255, 217, 39)}' 
		+ '.sexy_stop_gift{background:black; height:25px; border-width:1px; width:150px; font-weight:bold; color: rgb(255, 217, 39)}' 
		+ '.sexy_destination1{padding-top: 5px; padding-bottom: 5px; padding-right: 5px; padding-left: 20px; font-weight: bold; background-color:black; color:#FFD927; border: 1px solid #FFD927; overflow: hidden;}' 
		+ '.sexy_destination2{font-weight: bold; background-color:black; color:#FFD927; width:150px; border: 1px solid #FFD927; overflow: hidden;}' 
		+ '</style>';
	
	var popup = '<div id="poop_up" style="position: absolute; z-index: auto; display:none"></div>';
	
	var collection_list = london_collection
		+ chicago_collection
		+ brazil_collection
		+ mission_collection
		+ special_collection
		+ ny_collection
		+ moscow_collection
		+ bangkok_colection
		+ vegas_collection
		+ italy_collection
		+ cuban_collection;
	
	
	var loot_list = part_loot;	
	
	table_html = popup + '<form id="something" style="margin:5px"><table width="750" style="background-color:black;">' + '<tr>';
	table_html += '<table width="750" class="sexy_table1">' + '<tr>' + '<td width="78%" height="45" style="font-size:20px; padding-left:15px">' + version + '</td>' + '<td width="16%" style="font-size:13px;"><a id="Updates">Updates</a> - <a id="Website" href="http://simony.dk" target="_blank">Simony</a> - </td>' + '<td width="3%"><a href="#" id="close"><img alt="X" src="http://mwfb.static.zynga.com/mwfb/graphics/icon_remove_16x16_01.gif"></a></td>' + '</tr>' + '<tr height="20" align=right><td>My Chucker is free to use and share - Donations are welcome at <a href="http://simony.dk" target="_blank">simony.dk</td></tr>' + '</table>';
	table_html += '<table width="750" class="sexy_table1">' + '<tr height="25">' + '<td width="19%">Chuck at :</td>' + '<td width="27%"><input type=radio id=user_loc_profile value=1 name=user_loc checked></input>Get ID from Profile</td>' + '<td width="27%"><input type=radio id=user_loc_list value=1 name=user_loc style="background:black;"></input>User List ->>&nbsp;&nbsp;<a id="AddToFav" style="float:right"><img src="http://simony.dk/gs/favstar.gif"></img></a><span style="float:right">&nbsp;&nbsp;</span><a id="ClearFav" style="float:right"><img src="http://simony.dk/gs/unfavstar.gif"></img></a></td>' + '<td width="27%"><Select id="user_list" class="sexy_select" onclick="user_loc_list.checked=true;"></select></td>' + '</tr>';
	table_html += '<tr height="20">' + '<td width="19%">Loot sorted by :</td>' + '<td width="27%"><Select class="sexy_select" id="loot_sorting">' + loot_sort_cat + '</select></td>' + '</tr>';
	
	table_html += '<tr height="20">' + '<td width="19%">Gift Type :</td>' + '<td width="27%"><input type=radio id=gift_cat value=1 name=gift_categ checked disabled></input>LOOT</td>' + '<td width="27%"><input id=gift_cat1 type=radio name=gift_categ value=0 disabled></input>COLLECTION</td>' + '<td width="27%"><input id=gift_cat2 name=gift_categ value=2 type=radio disabled></input>BOOST</td>' + '</tr>';
	table_html += '<tr height="20">' + '<td width="19%">Gift :</td>' + '<td width="27%"><Select class="sexy_select" id="loot_gift_id">' + loot_list + '</select></td>' + '<td width="27%"><Select class="sexy_select" id="collection_gift_id">' + collection_list + '</select></td>' + '<td width="27%"><Select class="sexy_select" id="boost_gift_id">' + boosts_list + '</select></td>' + '</tr>';
	table_html += '<tr height="25">' + '<td width="19%">Quantity :</td>' + '<td width="27%"><input type="text" id="quantity" value="1" class="sexy_input" style="width:70%" onkeydown="return field_validate(event.keyCode);"></input>&nbsp;<input id="send_all" type="checkbox"></input>&nbsp;<input id="send_all_but_one" type="checkbox"></input></td>' + '<td colspan="2" id="item_quantity" style="padding-left:10px"></td>' + '</tr>';
	table_html += '<tr height="25">' + '<td width="19%">Time Delay :</td>' + '<td width="27%"><input type="text" id="delay1" value="2" class="sexy_input" style="width:35%" onkeydown="return field_validate(event.keyCode);"></input>&nbsp;-&nbsp;<input type="text" id="delay2" value="4" class="sexy_input" style="width:35%" onkeydown="return field_validate(event.keyCode);"></input></td>' +  '<td align=right style="padding-left:5px"><a id="refresh_stock" class="sexy_button_new"><span><span style="width:160px">REFRESH STOCK</span></span></a></td>' + '<td align=right style="padding-right:5px"><a id="add_to_wishlist" class="sexy_button_new"><span><span style="width:160px">ADD TO WISHLIST</span></span></a></td>' + '</tr>';
	table_html += '<tr height="25">' + '<td colspan="4"><a id="begin" class="sexy_button_new"><span><span style="width:115px">START</span></span></a>&nbsp;&nbsp;' + '<a id="end" class="sexy_button_new"><span><span style="width:115px">STOP</span></span></a>&nbsp;&nbsp;' + '<a id="queue" class="sexy_button_new"><span><span style="width:115px">ADD TO QUEUE</span></span></a>&nbsp;&nbsp;' + '<a id="queue_clear" class="sexy_button_new"><span><span style="width:115px">CLEAR QUEUE</span></span></a>&nbsp;&nbsp;' + '<a id="send_all_items" class="sexy_button_new"><span><span style="width:115px">SEND ALL</span></span></a></td>' + '</tr>' + '</table>' + '<table width="750" class="sexy_table1" style="display:none">' + '<td style="width:10%"><a id="add_NY" class="sexy_button_new"><span><span><img src="http://mwfb.static.zynga.com/mwfb/graphics/item_computer_setup_02.gif" width="20" height="20"></img><img src="http://mwfb.static.zynga.com/mwfb/graphics/item_blackmail_photos_03.gif" width="20" height="20"></img><img src="http://mwfb.static.zynga.com/mwfb/graphics/item_illegal_transaction_records_03.gif" width="20" height="20"></img></span></span></a></td>' + '<td rowspan="6" style="width:90%"><textarea id="manual_queue" cols="66" rows="10" class="sexy_input"></textarea></td>' + '</tr>' + '<tr>' + '<td style="width:10%"><a id="add_Cuba" class="sexy_button_new"><span><span><img src="http://mwfb.static.zynga.com/mwfb/graphics/item_untrace_cell_phone_03.gif" width="20" height="20"></img><img src="http://mwfb.static.zynga.com/mwfb/graphics/item_politicocorrupto_75x75_01.gif" width="20" height="20"></img></span></span></a></td>' + '</tr>' + '<tr>' + '<td style="width:10%"><a id="add_Moscow" class="sexy_button_new"><span><span><img src="http://mwfb.static.zynga.com/mwfb/graphics/item_IntelOnDmitri_75x75_01.gif" width="20" height="20"></img><img src="http://mwfb.static.zynga.com/mwfb/graphics/MW_INV_BankGuardUniform_B75GIF.gif" width="20" height="20"></img><img src="http://mwfb.static.zynga.com/mwfb/graphics/item_StickofDynamite_B75GIF.gif" width="20" height="20"></img></span></span></a></td>' + '</tr>' + '<tr>' + '<td style="width:10%"><a id="add_Bangkok" class="sexy_button_new"><span><span><img src="http://mwfb.static.zynga.com/mwfb/graphics/item_bangkok_Pirate_b.gif" width="20" height="20"></img><img src="http://mwfb.static.zynga.com/mwfb/graphics/item_bangkok_satellitephone_b.gif" width="20" height="20"></img><img src="http://mwfb.static.zynga.com/mwfb/graphics/item_bangkok_DrugShipment_b.gif" width="20" height="20"></img></span></span></a></td>' + '</tr>' + '<tr>' + '<td style="width:10%"><a id="add_CS" class="sexy_button_new"><span><span><img src="http://mwfb.static.zynga.com/mwfb/graphics/item_powertools_01.gif" width="20" height="20"></img><img src="http://mwfb.static.zynga.com/mwfb/graphics/item_shippingcontainers_01.gif" width="20" height="20"></img><img src="http://mwfb.static.zynga.com/mwfb/graphics/item_carlift_01.gif" width="20" height="20"></img></span></span></a></td>' + '</tr>' + '<tr>' + '<td style="width:10%"><a id="add_WD" class="sexy_button_new"><span><span><img src="http://mwfb.static.zynga.com/mwfb/graphics/item_arcwelder_01.gif" width="20" height="20"></img><img src="http://mwfb.static.zynga.com/mwfb/graphics/item_forge_01.gif" width="20" height="20"></img><img src="http://mwfb.static.zynga.com/mwfb/graphics/item_electronicwhetstone_01.gif" width="20" height="20"></img></span></span></a></td>' + '</tr>' + '<tr>' + '<td style="width:10%" colspan="2"><a id="manual_add_queue" class="sexy_button_new"><span><span><img src="http://simony.dk/gs/queue_remove.png"></img>ADD TO QUEUE</span></span></a>' + '<a id="manual_get_queue" class="sexy_button_new"><span><span><img src="http://simony.dk/gs/queue_add.png"></img>GET FROM QUEUE</span></span></a></td>' + '</tr>' + '<tr>' + '</table>' + '<table width="750" class="sexy_table1">' + '<tr>' + '<td width="8%" valign="top">Queue :</td>' + '<td width="5%" valign="top"><input type="text" id="queue_size" value="10" class="sexy_input" style="width:25px" onkeydown="return field_validate(event.keyCode);"></input></td>' + '<td id="gift_queue">&nbsp;</td>' + '</tr>' + '<table width="750" class="sexy_table1">' + '<tr>' + '<td width="8%" valign="top">Log :</td>' + '<td width="5%" valign="top"><input type="text" id="log_size" value="10" class="sexy_input" style="width:25px" onkeydown="return field_validate(event.keyCode);"></input></td>' + '<td id="logger">&nbsp;</td>' + '</tr>' + '<tr>' + '<td>&nbsp;</td>' + '<td>&nbsp;</td>' + '<td id="logged"></td>' + '</tr>' + '</table>' + '</table>' + '</td>' + '</tr>' + '</table>' + '</form>';
	
	l.innerHTML = styles + error_window + table_html;
	k.insertBefore(l, k.firstChild);
	var B = 0;
	var C = 0;
	try {
		document.captureEvents(Event.MOUSEMOVE);
		document.onmousemove = function (e) {
			B = e.pageX;
			C = e.pageY
		}
	} catch(err) {
		document.getElementById('popup_permanence').innerHTML = 'Error - ' + err
	}
	var D = readCookie('cFav');
	var E = '';
	var F = '';
	var G = '';
	E += '<Option value=\'none\' style="color:red;">None</option>';
	E += '<Option value=\'favlist\'  style="color:#33FF00;">-- Favourites List --</option>';
	if (D != null) {
		D = D.split('|');
		for (i = 1; i < D.length; i++) {
			F += '<Option value=' + D[i].split(':')[0] + '>' + D[i].split(':')[1] + '</option>'
		}
	} else {
		D = []
	}
	G += '<Option value=\'none\'  style="color:#33FF00;" disabled>-- Friends --</option>';
	document.getElementById('user_list').innerHTML = E + F + G;
	var H, sf_xw_sig;
	var K, gift_Id, gift_Cat, gift_key = readCookie('gkey');
	var M, gifts_sent, gift_text;
	var I, view_gift_id, view_quantity, view_user_id;
	var J = 0;
	var S;
	var L = [],
	receiverName = [];
	var T = [];
	var N = [];
	var O = true;
	var P;
	var Q, item_amounts, receiver_user_id = [];
	var R;
	sf_xw_sig = local_xw_sig;
	H = /&cb=([a-z0-9]+)/.exec(document.body.innerHTML);
	var ZyngaItems;
	doLootAnalyze();
	
	
	function send_all_qty() {
		if (qty_updated == false) {
			logmsg('Quantity not updated, please wait until it updates', 'false');
			document.forms.something.send_all.checked = false;
			document.forms.something.send_all_but_one.checked = false;
			return
		}
		if (document.forms.something.send_all.checked) {
			document.forms.something.send_all_but_one.checked = false;
			if (isNaN(item_amounts[I][view_gift_id])) {
				document.forms.something.quantity.value = 1
			} else {
				document.forms.something.quantity.value = item_amounts[I][view_gift_id]
			}
		} else if (document.forms.something.send_all_but_one.checked) {
			document.forms.something.send_all.checked = false;
			if (isNaN(item_amounts[I][view_gift_id])) {
				document.forms.something.quantity.value = 1
			} else {
				document.forms.something.quantity.value = item_amounts[I][view_gift_id] - 1
			}
		} else {
			document.forms.something.quantity.value = 1
		}
	}
	
	function send_all_items() {
		L = [];
		receiverName = [];
		switch (true) {
		case document.forms.something.user_loc_profile.checked:
			try {
				var a = document.evaluate('//a[contains(string(),"Send Gift")]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
				if (a.snapshotLength == 0) {
					alert('1. Please head over to the recipient\'s MW Profile Page or Choose a recipient from the User list\n\n2.Ensure you are in each other\s mafia');
					return
				}
				S = document.evaluate("//div[@class='tab_content']//a[contains(string(),'Profile')]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
				S = S.snapshotItem(0).href;
				S = (/.+user=p\|([0-9]+)/.exec(S))[1];
				L[L.length] = 'p|' + S;
				receiverName[receiverName.length] = document.evaluate("//span[@class=\"levels\"]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
				receiverName[receiverName.length - 1] = /\((.+?)\)/.exec(receiverName[receiverName.length - 1])[1];
				receiverName[receiverName.length - 1] = receiverName[receiverName.length - 1].replace(/:/g, '')
			} catch(err) {
				alert('Error adding to queue from Profile page - ' + err);
				return
			}
			break;
		case document.forms.something.user_loc_list.checked:
			if (document.forms.something.user_list.value == 'none') {
				alert('Error ! No user selected');
				return
			}
			try {
				if (document.forms.something.user_list.value == 'favlist') {
					for (i = 1; i < D.length; i++) {
						L[L.length] = document.forms.something.user_list.options[document.forms.something.user_list.selectedIndex + i].value;
						receiverName[receiverName.length] = document.forms.something.user_list.options[document.forms.something.user_list.selectedIndex + i].text
					}
				} else {
					L[L.length] = document.forms.something.user_list.value;
					receiverName[receiverName.length] = document.forms.something.user_list.options[document.forms.something.user_list.selectedIndex].text
				}
			} catch(err) {
				alert('Error adding to queue from Profile page - ' + err);
				return
			}
			break
		}
		var b, temp_giftId;
		for (b in item_amounts) {
			for (temp_giftId in item_amounts[b]) {
				if (parseInt(item_amounts[b][temp_giftId]) <= 0) {
					continue
				}
				if (document.forms.something.user_list.value == 'favlist') {
					for (i = 0; i < D.length - 1; i++) {
						T[T.length] = b + ":" + temp_giftId + ":" + Q[b][temp_giftId] + ":" + L[i] + ":" + receiverName[i] + ":" + item_amounts[b][temp_giftId]
					}
				} else {
					T[T.length] = b + ":" + temp_giftId + ":" + Q[b][temp_giftId] + ":" + L[0] + ":" + receiverName[0] + ":" + item_amounts[b][temp_giftId]
				}
			}
		}
		queue_display();
		return false
	}
	function get_quantity() {
		document.getElementById('item_quantity').innerHTML = 'Updating quantity, Please wait...';
		qty_updated = false;
		try {
			quantity_url = http + 'facebook.mafiawars.zynga.com/mwfb/remote/html_server.php?xw_controller=gift&xw_action=view&xw_city=1&xw_client_id=8&cb=' + H[1];
			params = {
				'ajax': 1,
				'liteload': 1,
				'sf_xw_user_id': 'p|' + g,
				'sf_xw_sig': local_xw_sig
			};
			$.ajax({
				type: "POST",
				url: quantity_url,
				data: params,
				success: function (a) {
					quantity_state(a)
				},
				error: function (a) {
					quantity_state('error')
				}
			})
		} catch(err) {
			alert_user('catch block ' + err)
		}
	}
	
	// Following sub variables from doLootAnalyze() JSON call
	
	// id: Unique key
	// type: number
	// name
	// plural_name
	// quantified_singular_name
	// attack:
	// defense
	// tradeable
	// faction
	// unique
	// quality
	// location
	// subtypes
	// equipped_offense
	// equipped_defense
	// visible:
	// quantity:
	// image:
	// hugeImg
	// imagesrc:
	// FreeGiftable:
	// feature:
	// lp_price:
	// vc_available:
	// rp_price:
	// pawn_shop:
	// favor_id:
	// purchasable:
	// cash_price:
	// formated_price:
	// city:
	// loc_name:
	// name_safe:
	// specialAbility
	// compare_quantity:
	// gift_link:
	// quantity:
	// faction_required:
	// active:
	// wishlist:
	
	
	function doLootAnalyze(){
		$.ajax({
			type: 'POST',
			url: http + 'facebook.mafiawars.zynga.com/mwfb/remote/html_server.php?xw_controller=inventory&xw_action=view&xw_city=&from_controller=inventory',
			data: params,
			success: function (response) {
				ZyngaItems = jQuery.parseJSON(/var Items = \{\s+data: (\{.*?\})\};/.exec(response)[1]);
			}	
				
		});
	}
			
			
	function quantity_state(a) {
		if (a == 'error') {
			alert_user('Error accessing gifting page. Please check if you can access your gifting page')
		}
		if (/Gifting|Trading/.test(a)) {
			try {
				item_amounts = eval(/item_amounts\s=\s(.+)};/.exec(a)[0] + ';');
				Q = eval(/item_names\s=\s(.+)};/.exec(a)[0] + ';')
			} catch(err) {
				alert('Error area 1 - ' + err)
			}
			gift_key = /gift_key"\svalue="([a-f0-9]+)/.exec(a)[1];
			if (!gift_key) {
				alert_user('Couldnt fetch Gift Key !');
				return
			}
			if (O == true) {
				P = eval(/groups_levels\s=\s(.+)};/.exec(a)[0] + ';');
				for (receiver_id in P) {
					if (P[receiver_id] == undefined || P[receiver_id] == ' ' || P[receiver_id] == '(Unknown) ') {
						continue
					}
					receiver_user_id[receiver_user_id.length] = [];
					receiver_user_id[receiver_user_id.length - 1][0] = P[receiver_id];
					receiver_user_id[receiver_user_id.length - 1][1] = receiver_id
				}
				receiver_user_id.sort();
				for (i = 0; i < receiver_user_id.length; i++) {
					G += '<Option value=' + receiver_user_id[i][1] + '>' + receiver_user_id[i][0] + '</option>'
				}
				document.getElementById('user_list').innerHTML = E + F + G;
				O = false
			}
			document.getElementById('item_quantity').innerHTML = '';
			switch (true) {
			case document.forms.something.gift_cat.checked:
				setTimeout(loot_click, 500);
				break;
			case document.forms.something.gift_cat1.checked:
				setTimeout(collection_click, 500);
				break;
			case document.forms.something.gift_cat2.checked:
				setTimeout(boost_click, 500);
				break
			}
			J = /gifts_daily_left = (\d+)/.exec(a)[1];
			qty_updated = true
		}
	}
	function start_send() {
		stop = false;
		gifts_sent = 0;
		exit_gifter = false;
		if (T.length == 0) {
			if ((document.forms.something.user_loc_list.checked) && (document.forms.something.user_list.value == 'none')) {
				alert('Error ! No user selected');
				return
			}
			if (document.forms.something.user_loc_profile.checked) {
				var a = document.evaluate('//a[contains(string(),"Send Gift")]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
				if (a.snapshotLength == 0) {
					alert('1. Please head over to the recipient\'s MW Profile Page or Choose a recipient from the User list\n\n2.Ensure you are in each other\s mafia');
					return
				}
			}
			add_to_queue();
			setTimeout(start_send, 1000);
			return
		} else {
			gift_Cat = T[0].split(":")[0];
			gift_Id = T[0].split(":")[1];
			receiver_profile_id = T[0].split(":")[3];
			gifts = T[0].split(":")[5];
			try {
				T.splice(0, 1)
			} catch(err) {
				alert(err);
				return
			}
			queue_display()
		}
		if (receiver_profile_id == '47810573' || receiver_profile_id == '100000042375085') {
			alert('The person you are trying to Chuck to is a known Scammer. Aborting Chucking..');
			return
		}
		logmsg('Starting the Chucker..', 'false');
		document.getElementById("begin").onclick = "return false;";
		document.getElementById("end").onclick = stop_send;
		post_request();
		return false
	}
	function stop_send() {
		stop = true;
		document.getElementById("begin").onclick = start_send;
		document.getElementById("end").onclick = function () {
			return false
		}
	}
	function post_request() {
		K = (gifts - gifts_sent) >= 50 ? 50 : ((gifts - gifts_sent) >= 25 ? 25 : ((gifts - gifts_sent) >= 10 ? 10 : ((gifts - gifts_sent) >= 5 ? 5 : 1)));
		R = http + 'facebook.mafiawars.zynga.com/mwfb/remote/html_server.php?xw_controller=gift&xw_action=send&xw_city=' + h + '&xw_person=' + g + '&xw_client_id=8&gift_key=' + gift_key + '&gift_id=' + gift_Id + '&gift_category=' + gift_Cat + '&sendkey=&gift_count=' + K + '&recipients[]=' + receiver_profile_id;
		params = {
			'ajax': 1,
			'liteload': 1,
			'sf_xw_user_id': 'p|' + g,
			'sf_xw_sig': local_xw_sig
		};
		try {
			if (stop == true) {
				if (gifts_sent > 0) {
					logmsg('Chucking stopped..', 'true')
				}
				get_quantity();
				return
			} else if (gifts_sent >= gifts) {
				logmsg('Fetching next item from Queue...', 'true');
				if (T.length == 0) {
					logmsg('All gifts sent', 'true');
					get_quantity();
					stop = true;
					stop_send();
					return
				} else {
					gifts_sent = 0;
					gift_Cat = T[0].split(":")[0];
					gift_Id = T[0].split(":")[1];
					receiver_profile_id = T[0].split(":")[3];
					gifts = T[0].split(":")[5];
					try {
						T.splice(0, 1);
						queue_display()
					} catch(err) {
						alert(err)
					}
					K = (gifts - gifts_sent) >= 50 ? 50 : ((gifts - gifts_sent) >= 25 ? 25 : ((gifts - gifts_sent) >= 10 ? 10 : ((gifts - gifts_sent) >= 5 ? 5 : 1)));
					R = http + 'facebook.mafiawars.zynga.com/mwfb/remote/html_server.php?xw_controller=gift&xw_action=send&xw_city=' + h + '&xw_person=' + g + '&xw_client_id=8&gift_key=' + gift_key + '&gift_id=' + gift_Id + '&gift_category=' + gift_Cat + '&sendkey=&gift_count=' + K + '&recipients[]=' + receiver_profile_id
				}
			}
			if (K == 1) {
				R = http + 'facebook.mafiawars.zynga.com/mwfb/remote/html_server.php?xw_controller=stats&xw_action=gift_send' + '&xw_city=' + h + '&user=' + receiver_profile_id + '&gift_category=' + gift_Cat + '&gift_id=' + gift_Id + '&gift_key=' + gift_key + '&recipients[0]=' + receiver_profile_id + '&xw_client_id=8'
			}
			$.ajax({
				type: 'POST',
				url: R,
				data: params,
				timeout: 45000,
				success: function (a) {
					process_send(a)
				},
				error: function (a) {}
			})
		}  catch(err) {
			alert_user('Error in post request - ' + err)
		} 
	}
	function process_send(a) {
		delay1 = parseInt(document.getElementById('delay1').value);
		delay1 = delay1 < 2 ? 2 : delay1;
		document.getElementById('delay1').value = delay1;
		delay2 = parseInt(document.getElementById('delay2').value);
		delay2 = delay2 < 2 ? 2 : delay2;
		document.getElementById('delay2').value = delay2;
		var b = (delay2 > delay1 ? delay2: delay1);
		var c = (delay2 > delay1 ? delay1: delay2);
		var d = Math.floor((b - (c - 1)) * Math.random()) + c;
		if (/You have already reached the daily limit for today/i.test(a)) {
			logmsg('Reached the daily limit of 10000, Stopped..', 'true');
			stop_send();
			get_quantity();
			return
		}
		if (/You gave/.test(a)) {
			try {
				gift_text = /You gave (\d+)(.+?) to (.+?)\./i.exec(a);
				gifts_sent += parseInt(gift_text[1]);
				logmsg('Sent <font color=#33FF00>' + gifts_sent + '(x)</font> of <font color=#33FF00>' + gifts + '</font> ' + gift_text[2] + '(s) to <a href="http://apps.facebook.com/inthemafia/profile.php?id={"user":"' + receiver_profile_id + '"}" target="_blank">' + gift_text[3] + '</a>', 'false');
				try {
					local_xw_sig = /local_xw_sig\s=\s'([^']+)/.exec(a)[1]
				} catch(err) {}
				setTimeout(post_request, d * 1000)
			} catch(err) {
				alert('Some error in received response - ' + err)
			}
		} else if (/Please wait a moment before sending another gift/.test(a)) {
			logmsg('Delay set too low, Increasing Delay and retrying...', 'true');
			delay1++;
			delay2++;
			delay1 = delay1 < 2 ? 2 : delay1;
			delay2 = delay2 < 2 ? 4 : delay2;
			document.getElementById('delay1').value = delay1;
			document.getElementById('delay2').value = delay2;
			var b = (delay2 > delay1 ? delay2: delay1);
			var c = (delay2 > delay1 ? delay1: delay2);
			var d = Math.floor((b - (c - 1)) * Math.random()) + c;
			setTimeout(post_request, d * 1000);
			return
		} else if (/have enough of that/.test(a)) {
			logmsg('Insufficient quantity, fetching next item from queue..', 'true');
			gifts_sent = gifts;
			setTimeout(post_request, d * 1000);
			return
		} else {
			gifts_sent += K;
			logmsg('Unknown response received, retrying..', 'true');
			logmsg('Unknown response received, retrying..', 'true');
			setTimeout(post_request, d * 1000);
			return
		}
	}
	function clear_queue() {
		try {
			T = [];
			queue_display()
		} catch(err) {
			alert_user('Error in clearing - ' + err)
		}
	}
	function add_set_to_queue() {
		collection_id_list = [];
		collection_list_name = [];
		var a;
		var b = parseInt(/QueueSet_(\d+)/.exec(view_gift_id)[1]) + 1;
		switch (I) {
		case 0:
			a = document.forms.something.collection_gift_id;
			break;
		case 1:
			a = document.forms.something.loot_gift_id;
			break;
		case 2:
			a = document.forms.something.boost_gift_id;
			break;
		default:
			break
		}
		for (i = 1; i < b; i++) {
			collection_id_list[collection_id_list.length] = a.options[a.selectedIndex + i].value;
			collection_list_name[collection_list_name.length] = a.options[a.selectedIndex + i].text
		}
		for (i = 0; i < collection_id_list.length; i++) {
			M = parseInt(document.forms.something.quantity.value);
			if (M < 1 || isNaN(M)) {
				alert('Hello Scrooge, You cant send 0 or blank gifts');
				document.forms.something.quantity.value = 1;
				M = 1;
				return
			}
			if (item_amounts[I][collection_id_list[i]] > 0 && !(isNaN(item_amounts[I][collection_id_list[i]]))) {
				if (M > item_amounts[I][collection_id_list[i]]) {
					M = item_amounts[I][collection_id_list[i]]
				}
				if (document.forms.something.user_list.value == 'favlist') {
					for (j = 0; j < D.length - 1; j++) {
						T[T.length] = I + ":" + collection_id_list[i] + ":" + collection_list_name[i] + ":" + L[j] + ":" + receiverName[j] + ":" + M
					}
				} else {
					T[T.length] = I + ":" + collection_id_list[i] + ":" + collection_list_name[i] + ":" + L[0] + ":" + receiverName[0] + ":" + M
				}
			}
		}
		queue_display()
	}
	function add_to_queue() {
		try {
			L = [];
			receiverName = [];
			switch (true) {
			case document.forms.something.user_loc_profile.checked:
				try {
					var a = document.evaluate('//a[contains(string(),"Send Gift")]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
					if (a.snapshotLength == 0) {
						alert('1. Please head over to the recipient\'s MW Profile Page or Choose a recipient from the User list\n\n2.Ensure you are in each other\s mafia');
						return
					}
					S = document.evaluate("//div[@class='tab_content']//a[contains(string(),'Profile')]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
					S = S.snapshotItem(0).href;
					S = (/.+user=p\|([0-9]+)/.exec(S))[1];
					L[L.length] = 'p|' + S;
					receiverName[receiverName.length] = document.evaluate("//span[@class=\"levels\"]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
					receiverName[receiverName.length - 1] = receiverName[receiverName.length - 1].snapshotItem(0).innerHTML;
					receiverName[receiverName.length - 1] = /\((.+?)\)/.exec(receiverName[receiverName.length - 1])[1];
					receiverName[receiverName.length - 1] = receiverName[receiverName.length - 1].replace(/:/g, '')
				} catch(err) {
					alert('Error adding to queue from Profile page - ' + err);
					return
				}
				break;
			case document.forms.something.user_loc_list.checked:
				if (document.forms.something.user_list.value == 'none') {
					alert('Error ! No user selected');
					return
				}
				try {
					if (document.forms.something.user_list.value == 'favlist') {
						for (i = 1; i < D.length; i++) {
							L[L.length] = document.forms.something.user_list.options[document.forms.something.user_list.selectedIndex + i].value;
							receiverName[receiverName.length] = document.forms.something.user_list.options[document.forms.something.user_list.selectedIndex + i].text
						}
					} else {
						L[L.length] = document.forms.something.user_list.value;
						receiverName[receiverName.length] = document.forms.something.user_list.options[document.forms.something.user_list.selectedIndex].text
					}
				} catch(err) {
					alert('Error adding to queue from User list - ' + err)
				}
				break
			}
			M = parseInt(document.forms.something.quantity.value);
			if (M < 1 || isNaN(M)) {
				alert('Hello Scrooge, You cant send 0 or blank gifts');
				document.forms.something.quantity.value = 1;
				M = 1;
				return
			}
			if (M > item_amounts[I][view_gift_id]) {
				M = item_amounts[I][view_gift_id]
			}
			if (/QueueSet/.test(view_gift_id)) {
				add_set_to_queue()
			} else {
				if (document.forms.something.user_list.value == 'favlist') {
					for (i = 0; i < D.length - 1; i++) {
						T[T.length] = I + ":" + view_gift_id + ":" + item_name + ":" + L[i] + ":" + receiverName[i] + ":" + M
					}
				} else {
					T[T.length] = I + ":" + view_gift_id + ":" + item_name + ":" + L[0] + ":" + receiverName[0] + ":" + M
				}
				queue_display()
			}
		} catch(err) {
			alert_user('Error adding to queue -' + err)
		}
	}
	function removeItem() {
		var a = (this.id);
		a = /del([0-9]+)/.exec(a)[1];
		T.splice(a, 1);
		queue_display();
		return false
	}
	function queue_display() {
		try {
			var i;
			var a;
			var b;
			if (T.length < parseInt(document.forms.something.queue_size.value)) {
				a = T.length
			} else {
				a = parseInt(document.forms.something.queue_size.value)
			}
			document.getElementById('gift_queue').innerHTML = '&nbsp;';
			var c = '';
			try {
				for (i = 0; i < a; i++) {
					c += '<a href=\'#\' id=\'del' + i + '\'><img alt="X" src="http://mwfb.static.zynga.com/mwfb/graphics/icon_remove_16x16_01.gif"></a> ' + T[i].split(":")[5] + '(x) ' + T[i].split(":")[2] + ' to ' + T[i].split(":")[4] + '<br>'
				}
				document.getElementById('gift_queue').innerHTML = c
			} catch(err) {
				alert_user('Error displaying queue - ' + err)
			}
			try {
				for (i = 0; i < a; i++) {
					document.getElementById("del" + i).onclick = null;
					document.getElementById("del" + i).onclick = removeItem
				}
			} catch(err) {
				alert_user('Error assigning event - ' + err)
			}
		} catch(err) {
			alert_user('Error in Display queue - ' + err)
		}
	}
	function loot_click() {
		I = 1;
		document.forms.something.gift_cat.checked = true;
		view_gift_id = document.forms.something.loot_gift_id.value;
		item_name = document.forms.something.loot_gift_id.options[document.forms.something.loot_gift_id.selectedIndex].text;
		if (item_amounts[I][view_gift_id] == 0 || isNaN(item_amounts[I][view_gift_id])) {
			document.getElementById('item_quantity').innerHTML = 'You\'ve got none of these. Gifting Limit : ' + J
		} else {
			if (document.forms.something.send_all.checked) {
				document.forms.something.quantity.value = item_amounts[I][view_gift_id]
			}
			if (document.forms.something.send_all_but_one.checked) {
				document.forms.something.quantity.value = item_amounts[I][view_gift_id] - 1
			}
			// Insert how many used A/D: lootname (used A:xxx/D:xxx) xxxxx items?
			// equipped_offense
			// equipped_defense

			document.getElementById('item_quantity').innerHTML = 'You\'ve got ' + item_amounts[I][view_gift_id] + ' of these (Using A:<span title="Number active on attack." style="color:#FF9121; cursor:default;">' + ZyngaItems[view_gift_id].equipped_offense + '</span>/D:<span title="Number active on defense." style="color:#609AD1; cursor:default;">' + ZyngaItems[view_gift_id].equipped_defense + '</span>).<br>Free to send: ' + (item_amounts[I][view_gift_id] - Math.max(ZyngaItems[view_gift_id].equipped_offense, ZyngaItems[view_gift_id].equipped_defense)) + '.<br>Gifting Limit : ' + J
		}
	}
	
		
	
	
	function loot_cat_sort() {
		var loot_cat = document.forms.something.loot_sorting.value;
		
		if (loot_cat == 'Top10'){
			document.getElementById('loot_gift_id').innerHTML = top10_loot;
		}
		if (loot_cat == 'AZloot'){
			document.getElementById('loot_gift_id').innerHTML = AZ_loot;
		}
		if (loot_cat == 'AttackDesc'){
			document.getElementById('loot_gift_id').innerHTML = att70_loot;
		}
		if (loot_cat == 'DefenseDesc'){
			document.getElementById('loot_gift_id').innerHTML = def70_loot;
		}
		if (loot_cat == 'CombinedDesc'){
			document.getElementById('loot_gift_id').innerHTML = combined_loot;
		}
		if (loot_cat == 'Henchmen'){
			document.getElementById('loot_gift_id').innerHTML = henchmen_loot;
		}
		if (loot_cat == 'LondonParts'){
			document.getElementById('loot_gift_id').innerHTML = london_parts;
		}
		if (loot_cat == 'Chicago'){
			document.getElementById('loot_gift_id').innerHTML = chicago_loot;
		}
		if (loot_cat == 'Brazil'){
			document.getElementById('loot_gift_id').innerHTML = brazil_loot;
		}
		if (loot_cat == 'Italy'){
			document.getElementById('loot_gift_id').innerHTML = italy_loot;
		}
		if (loot_cat == 'Las Vegas'){
			document.getElementById('loot_gift_id').innerHTML = vegas_loot;
		}
		if (loot_cat == 'Bangkok'){
			document.getElementById('loot_gift_id').innerHTML = bangkok_loot;
		}
		if (loot_cat == 'Moscow'){
			document.getElementById('loot_gift_id').innerHTML = moscow_loot;
		}
		if (loot_cat == 'Cuba'){
			document.getElementById('loot_gift_id').innerHTML = cuba_loot;
		}
		if (loot_cat == 'NY'){
			document.getElementById('loot_gift_id').innerHTML = ny_loot;
		}
		if (loot_cat == 'Special Event'){
			document.getElementById('loot_gift_id').innerHTML = specialevent_loot;
		}
		if (loot_cat == 'Fight'){
			document.getElementById('loot_gift_id').innerHTML = fight_loot;
		}
		if (loot_cat == 'War'){
			document.getElementById('loot_gift_id').innerHTML = war_loot;
		}
		if (loot_cat == 'Marketplace'){
			document.getElementById('loot_gift_id').innerHTML = marketplace_loot;
		}
		if (loot_cat == 'Gifting'){
			document.getElementById('loot_gift_id').innerHTML = gifting_loot;
		}
		if (loot_cat == 'Mission'){
			document.getElementById('loot_gift_id').innerHTML = mission_loot;
		}
		if (loot_cat == 'Property Loot'){
			document.getElementById('loot_gift_id').innerHTML = property_loot;
		}
		if (loot_cat == 'Secret Stash'){
			document.getElementById('loot_gift_id').innerHTML = secretstash_loot;
		}
		if (loot_cat == 'Misc Loot'){
			document.getElementById('loot_gift_id').innerHTML = misc_loot;
		}
		if (loot_cat == 'Parts'){
			document.getElementById('loot_gift_id').innerHTML = part_loot;
		}
		if (loot_cat == 'Consum'){
			document.getElementById('loot_gift_id').innerHTML = ny_cons
				+ cuba_cons
				+ vegas_cons
				+ moscow_cons
				+ bangkok_cons;
		}
	}
	
	
	function collection_click() {
		I = 0;
		document.forms.something.gift_cat1.checked = true;
		view_gift_id = document.forms.something.collection_gift_id.value;
		item_name = document.forms.something.collection_gift_id.options[document.forms.something.collection_gift_id.selectedIndex].text;
		if (item_amounts[I][view_gift_id] == 0 || isNaN(item_amounts[I][view_gift_id])) {
			document.getElementById('item_quantity').innerHTML = 'You\'ve got none of these. Gifting Limit : ' + J
		} else {
			if (document.forms.something.send_all.checked) {
				document.forms.something.quantity.value = item_amounts[I][view_gift_id]
			}
			if (document.forms.something.send_all_but_one.checked) {
				document.forms.something.quantity.value = item_amounts[I][view_gift_id] - 1
			}
			document.getElementById('item_quantity').innerHTML = 'You\'ve got ' + item_amounts[I][view_gift_id] + ' of these. Gifting Limit : ' + J
		}
	}
	function boost_click() {
		I = 2;
		document.forms.something.gift_cat2.checked = true;
		view_gift_id = document.forms.something.boost_gift_id.value;
		item_name = document.forms.something.boost_gift_id.options[document.forms.something.boost_gift_id.selectedIndex].text;
		if (item_amounts[I][view_gift_id] == 0 || isNaN(item_amounts[I][view_gift_id])) {
			document.getElementById('item_quantity').innerHTML = 'You\'ve got none of these. Gifting Limit : ' + J
		} else {
			if (document.forms.something.send_all.checked) {
				document.forms.something.quantity.value = item_amounts[I][view_gift_id]
			}
			if (document.forms.something.send_all_but_one.checked) {
				document.forms.something.quantity.value = item_amounts[I][view_gift_id] - 1
			}
			document.getElementById('item_quantity').innerHTML = 'You\'ve got ' + item_amounts[I][view_gift_id] + ' of these. Gifting Limit : ' + J
		}
	}
	function popupballoon_display(a) {
		try {
			document.getElementById('poop_up').style.top = (C + 20) + 'px';
			document.getElementById('poop_up').style.left = (B - 300) + 'px';
			document.getElementById('poop_up').style.width = '300px';
			document.getElementById('poop_up').style.display = 'block';
			switch (a) {
			case "Website":
				document.getElementById('poop_up').innerHTML = '<div class="sexy_destination1">Everything you need to know about using my BM\'s, please go through completely before posting any trouble you\'ve faced</div>';
				break;
			case "Timer":
				document.getElementById('poop_up').innerHTML = '<div class="sexy_destination1">Check this to force gift at 2 seconds and ignore Zynga Gifting speed limitations</div>';
				break;
			case "Sendall":
				document.getElementById('poop_up').innerHTML = '<div class="sexy_destination1">Send all of currently selected item</div>';
				break;
			case "SendallButOne":
				document.getElementById('poop_up').innerHTML = '<div class="sexy_destination1">Send all but one of currently selected item</div>';
				break;

			case "Updates":
				document.getElementById('poop_up').innerHTML = '<div class="sexy_destination1" style="color:white">A List of the updates made -' + '<table><tr style="color:white; height:10px"></tr>' + '<tr><td style="color:white; height:25px">' + updates + '</td></tr>' + '</table></div>';
				break;
			case "Fav":
				document.getElementById('poop_up').innerHTML = '<div class="sexy_destination1">Click this to add a User to your favourites list. Note: This list will get cleared if you ever clear out your Cookies</div>';
				break;
			case "UnFav":
				document.getElementById('poop_up').innerHTML = '<div class="sexy_destination1">Click this to clear out your favourites list</div>';
				break
			}
		} catch(err) {
			alert(err)
		}
	}
	function popupballoon_hide() {
		document.getElementById('poop_up').style.display = 'none'
	}
	function Add_to_Wishlist() {
		do_ajax('inner_page', 'remote/html_server.php?xw_controller=collection&xw_action=wishlist_add&xw_city=1&selected_city=' + h + '&gift_category=' + I + '&gift_id=' + view_gift_id, 1, 1, 0, 0)
	}
	function log_display() {
		var a = 0,
		i;
		if (N.length < parseInt(document.forms.something.log_size.value)) {
			a = N.length
		} else {
			a = parseInt(document.forms.something.log_size.value)
		}
		document.getElementById('logged').innerHTML = '';
		for (i = N.length - 1; i >= (N.length - a); i--) {
			document.getElementById('logged').innerHTML += N[i] + '<br>'
		}
	}
	function logmsg(a, b) {
		try {
			var c = new Date().getHours();
			var d = new Date().getMinutes();
			c = (c < 10 ? '0' + c: c);
			d = (d < 10 ? '0' + d: d);
			if (b == 'true') {
				N[N.length] = document.getElementById('logger').innerHTML
			}
			log_display();
			document.getElementById('logger').innerHTML = '<font color=#666666>[' + c + ':' + d + ']</font> ' + a
		} catch(err) {
			alert_user('Error in log display - ' + err)
		}
	}
	function AddToFav() {
		var a = document.forms.something.user_list.value;
		var b = document.forms.something.user_list.options[document.forms.something.user_list.selectedIndex].text;
		F += '<Option value=' + a + '>' + b + '</option>';
		document.getElementById('user_list').innerHTML = E + F + G;
		var c = readCookie('cFav');
		c = c + '|' + a + ':' + b;
		createCookie('cFav', c)
	}
	function ClearFav() {
		F = '';
		document.getElementById('user_list').innerHTML = E + F + G;
		createCookie('cFav', '')
	}
	function close_gifter() {
		document.getElementById("popup_permanence").removeChild(document.getElementById("gifter_div"));
		return false
	}
	function manual_get_queue() {
		var a, t = '';
		for (i = 0; i < T.length; i++) {
			a = T[i].split(":");
			t += a[5] + ' x ' + a[2] + ':' + a[3] + ':' + a[4] + '\n'
		}
		document.getElementById('manual_queue').value = t
	}
	function manual_add_queue() {
		var a = document.getElementById('manual_queue').value.split('\n');
		var b = [];
		var c = false;
		var d = '',
		receiver = '',
		receiverName = '';
		switch (true) {
		case document.forms.something.user_loc_profile.checked:
			var e = 0;
			var f = document.getElementsByTagName('a');
			for (i = 0; i < f.length; i++) {
				if (f[i].text == 'Profile' && e == 0) {
					e = 1
				} else if (f[i].text == 'Profile' && e == 1) {
					break
				}
			}
			if (! (/Send Energy Pack/i.test(document.body.innerHTML))) {
				c = false;
				break
			}
			if (! (e == 0 || i == f.length)) {
				S = document.evaluate("//div[@class='tab_content']//a[contains(string(),'Profile')]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
				S = S.snapshotItem(0).href;
				S = (/.+user=p\|([0-9]+)/.exec(S))[1];
				temp_receiverId = 'p|' + S;
				temp_receiverName = document.evaluate("//div[@class=\"title\"]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
				if ((/The Hospital/.test(temp_receiverName.snapshotItem(0).innerHTML)) || (/The Bank/.test(temp_receiverName.snapshotItem(0).innerHTML))) {
					temp_receiverName = temp_receiverName.snapshotItem(1).innerHTML
				} else {
					temp_receiverName = temp_receiverName.snapshotItem(0).innerHTML
				}
				temp_receiverName = /"([^"]+)/.exec(temp_receiverName)[1];
				temp_receiverName = temp_receiverName.replace(/:/g, '');
				c = true
			}
			break;
		case document.forms.something.user_loc_list.checked:
			if (document.forms.something.user_list.value != 'none') {
				temp_receiverId = document.forms.something.user_list.value;
				temp_receiverName = document.forms.something.user_list.options[document.forms.something.user_list.selectedIndex].text;
				c = true
			}
			break
		}
		try {
			for (i = 0; i < a.length; i++) {
				b = [];
				if (b = /(\d+) x (.+?):(.+?):(.+)/.exec(a[i])) {
					temp_gifts = parseInt(b[1]);
					if (temp_gifts < 1 || isNaN(temp_gifts)) {
						alert('Sorry Scrooge, You cant send 0 or blank gifts\n\nError in this manual queue line - ' + a[i]);
						return
					}
					d = trim(b[2]);
					temp_giftCat = item_name_list[d][1];
					temp_giftId = item_name_list[d][0];
					recipient = trim(b[3]);
					recipient_name = trim(b[4])
				} else if (b = /(\d+) x (.+?):(.+)/.exec(a[i])) {
					temp_gifts = parseInt(b[1]);
					if (temp_gifts < 1 || isNaN(temp_gifts)) {
						alert('Sorry Scrooge, You cant send 0 or blank gifts\n\nError in this manual queue line - ' + a[i]);
						return
					}
					d = trim(b[2]);
					temp_giftCat = item_name_list[d][1];
					temp_giftId = item_name_list[d][0];
					recipient = trim(b[3]);
					recipient_name = trim(b[3])
				} else if (b = /(\d+) x (.+)/.exec(a[i])) {
					temp_gifts = parseInt(b[1]);
					if (temp_gifts < 1 || isNaN(temp_gifts)) {
						alert('Sorry Scrooge, You cant send 0 or blank gifts\n\nError in this manual queue line - ' + a[i]);
						return
					}
					d = trim(b[2]);
					temp_giftCat = item_name_list[d][1];
					temp_giftId = item_name_list[d][0];
					if (c == false) {
						alert('No user selected from user list or Not on profile page');
						return
					}
					recipient = temp_receiverId;
					recipient_name = temp_receiverName
				} else {
					alert('Error in queue line number ' + (i + 1) + '\n\n\nQueue line - ' + a[i]);
					return
				}
				T[T.length] = temp_giftCat + ":" + temp_giftId + ":" + d + ":" + recipient + ":" + recipient_name + ":" + temp_gifts
			}
		} catch(err) {
			document.getElementById('popup_permanence').innerHTML = a[i] + '<br>';
			document.getElementById('popup_permanence').innerHTML = b + '<br>';
			document.getElementById('popup_permanence').innerHTML = d + '<br>'
		}
		queue_display()
	}
	document.getElementById("begin").onclick = start_send;
	document.getElementById("end").onclick = stop_send;
	document.getElementById("queue").onclick = add_to_queue;
	document.getElementById("manual_add_queue").onclick = manual_add_queue;
	document.getElementById("manual_get_queue").onclick = manual_get_queue;
	document.getElementById("queue_clear").onclick = clear_queue;
	document.getElementById("send_all_items").onclick = send_all_items;
	document.getElementById("add_to_wishlist").onclick = Add_to_Wishlist;
	document.getElementById("refresh_stock").onclick = get_quantity;
	document.getElementById("queue_size").onkeyup = queue_display;
	document.getElementById("log_size").onkeyup = log_display;
	document.getElementById("close").onclick = close_gifter;
	document.getElementById("send_all").onclick = send_all_qty;
	document.getElementById("send_all_but_one").onclick = send_all_qty;
	document.getElementById("ClearFav").onclick = ClearFav;
	document.getElementById("AddToFav").onclick = AddToFav;
	
	document.getElementById("loot_sorting").onchange = loot_cat_sort;

	document.getElementById("loot_gift_id").onclick = loot_click;
	document.getElementById("collection_gift_id").onclick = collection_click;
	document.getElementById("boost_gift_id").onclick = boost_click;
	document.getElementById("loot_gift_id").onchange = loot_click;
	document.getElementById("collection_gift_id").onchange = collection_click;
	document.getElementById("boost_gift_id").onchange = boost_click;
	document.getElementById("loot_gift_id").onkeyup = loot_click;
	document.getElementById("collection_gift_id").onkeyup = collection_click;
	document.getElementById("boost_gift_id").onkeyup = boost_click;
	document.getElementById('Website').onmousemove = function () {
		popupballoon_display("Website")
	};
	
	
	document.getElementById('Website').onmouseout = popupballoon_hide;
	document.forms.something.send_all.onmousemove = function () {
		popupballoon_display("Sendall")
	};
	document.forms.something.send_all.onmouseout = popupballoon_hide;
	document.forms.something.send_all_but_one.onmousemove = function () {
		popupballoon_display("SendallButOne")
	};
	document.forms.something.send_all_but_one.onmouseout = popupballoon_hide;
	document.getElementById('Updates').onmousemove = function () {
		popupballoon_display("Updates")
	};
	document.getElementById('Updates').onmouseout = popupballoon_hide;
	document.getElementById('ClearFav').onmousemove = function () {
		popupballoon_display("UnFav")
	};
	document.getElementById('ClearFav').onmouseout = popupballoon_hide;
	document.getElementById('AddToFav').onmousemove = function () {
		popupballoon_display("Fav")
	};
	document.getElementById('AddToFav').onmouseout = popupballoon_hide;
	get_quantity();
	
	function loot_list_type() {
		alert('list_type');
		document.getElementById('loot_gift_id').innerHTML = top10_loot;
	};
	
	function loadContent(a) {
		var b = document.getElementsByTagName('head').item(0);
		var c = document.getElementById('loadScript');
		if (c) b.removeChild(c);
		script = document.createElement('script');
		script.src = a;
		script.type = 'text/javascript';
		script.id = 'loadScript';
		b.appendChild(script);
		setTimeout(load, 5000)
	}
	loadContent('http://www.google-analytics.com/ga.js');
	function load() {
		try {
			var a = _gat._getTracker("UA-3078135-15");
			a._trackPageview("/Chucker")
		} catch(err) {}
	}
})()