'use strict';

angular.module('mApp')
.constant('constants',(constants)());

function constants(){
	var constant = {
		IMAGE_URL: 'http://cosphere.in:29193/bmdimgvideos/spacemainimg/356x281/',

		AMENITIES: {
			"Printer / Scanner / Fax": { image : "assets/images/printer.png", name  : "Printer/ Scanner/ Fax"},
			"Internet with Wifi": { image : "assets/images/wifi.png" , name : " Wifi/ AC" },
			"AC with Powerback" : {image : "assets/images/power.png", name : "Powerbackup"} ,
			"CCTV Monitor / Professional Security" : {image : "assets/images/professional-security.png", name : "Professional Security"},
			"Tea / Coffee" : {image : "assets/images/tea.png", name: "Tea/ Coffee" },
			"Car Parking" : {image : "assets/images/car-parking.png", name: "Car Parking"},
			"Open 24/7" : {image : "assets/images/24x7.png", name: "Open 24X7"},
			"Games / Library" : {name: "Games/Library"},
			"Partitioned / Noise Proof" : {name: "Partitioned/ Noise Proof"},
			"Projector / AV Equipment" : {name: "Projector/ AV Equipment"},
			"Reception / Front Desk" : {image:"assets/images/receptionist.png", name: "Reception / Front Desk"},
			"Locker / Storage" : {image:"assets/images/storage.png", name: "Document Storage/ Locker"},
			"Whiteboard" : {image: "assets/images/whiteboard.png", name:"Whiteboard"},
			"Onsite Cafeteria" : {image:"assets/images/cafeteria.png", name:"Onsite Cafeteria"},
		}
	};

	return constant;
}