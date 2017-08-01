sap.ui.controller("view.Home", {
	
		
	onAfterRendering: function(){
		
		var sUrl = "https://spreadsheets.google.com/feeds/list/1V31iqLrZjtAakX-FztCBh2XWbWTACAdHwr_ohjH8NIY/od6/public/values?alt=json";
		var that = this;
		
		var oToday = new Date();
		var oMonth = oToday.getMonth();
		oToday = oToday.getDate();
		var newDate;
		var originalDate;
		
		var sUrlCheck = "https://spreadsheets.google.com/feeds/list/1V31iqLrZjtAakX-FztCBh2XWbWTACAdHwr_ohjH8NIY/od6/public/values?alt=json";
		var that = this;
		var oItem;
		var oAppleCheck = 0;
		var oMilkCheck = 0;
		var oEggsCheck = 0;
		var oCurdCheck = 0;
		var oTomatoCheck = 0;
		var oChillyCheck = 0;
		var oLemonCheck = 0;
		var oFlag = 0;
		
		$.getJSON(sUrlCheck, function(data) {
			var aData = data.feed.entry;
			var len = aData.length;			
			for(var i=0;i<len;i++)
			{
				oItem = (aData[i].gsx$name.$t).toLowerCase();
				
				if(oItem == "apple")
					{
						oAppleCheck = 1;
					}
				if(oItem == "eggs")
					{
						oEggsCheck = 1;
					}
				if(oItem == "milk")
					{
						oMilkCheck = 1;
					}
				if(oItem == "tomato")
					{
						oTomatoCheck = 1;
					}
				if(oItem == "chilly")
					{
						oChillyCheck = 1;
					}
				if(oItem == "curd")
					{
						oCurdCheck =1;
					}
				if(oItem == "lemon")
					{
						oLemonCheck = 1;
					}
			}
		});
		
		
		$.getJSON(sUrl, function(data) {
			
			var aData = data.feed.entry;
			var len = aData.length;
			for(var i=0;i<len;i++)
				{
					if((aData[i].gsx$category.$t) != "Frozen")
						{
							originalDate = aData[i].gsx$daysold.$t;
							originalDate = parseInt(originalDate.slice(8,10));
							
							if (originalDate > oToday) {
								if (oMonth === 5 || oMonth === 7 || oMonth === 10 || oMonth === 12) {
									newDate = (30 - originalDate) + oToday;
								} else if (oMonth === 3) {
									newDate = (28 - originalDate) + oToday;
								} else {
									newDate = (31 - originalDate) + oToday;
								}
							} else {
								newDate = oToday - originalDate;
							}
							if ((newDate > 3) && (newDate < 7)){
								that.getView().byId("id_ButtonYellow").setVisible(true);
								oFlag = 1;
							} else if(newDate >= 7) {
								that.getView().byId("id_ButtonRed").setVisible(true);
								oFlag = 1;
							}
						}									
				}
			if((oAppleCheck == 0) || (oMilkCheck == 0) || (oEggsCheck == 0) || (oTomatoCheck == 0) || (oCurdCheck == 0) || (oLemonCheck == 0))
				{
					that.getView().byId("id_ButtonChecklist").setVisible(true);
				}
			else if (oFlag == 0)
				{
					that.getView().byId("id_Page").destroyFooter();
				}			
		});
						
	},
	
	onShowCategories: function() {
		this.getOwnerComponent().getRouter().navTo("masterlist");
	},

	onAddItem: function() {

		var that = this;
		if (sap.ui.getCore().byId('id_name') !== undefined) {
			sap.ui.getCore().byId('id_name').setValue(" ");
			sap.ui.getCore().byId('id_quantity').setValue(" ");
		}
		if (!that.oDialogAdd) {
			that.oDialogAdd = new sap.m.Dialog({
				title: "New Item",
				stretch: true,
				content: [new sap.m.VBox({
					alignItems: "Center",
					justifyContent: "SpaceAround",
					items: [
						new sap.m.Title({text:"Select Item Category"}),
						new sap.m.Carousel({
							id: "id_car",
							height: "250px",
							width: "250px",
							pages:[
								new sap.m.Image({src:"images/fruitsCategory.jpg", decorative: false, alt: "Fruit"}),
								new sap.m.Image({src:"images/vegetablesCategory.jpg", decorative: false, alt: "Vegetable"}),
								new sap.m.Image({src:"images/dairyCategory.jpg", decorative: false, alt: "Dairy"}),
								new sap.m.Image({src:"images/cerealCategory.jpg", decorative: false, alt: "Cereal"}),
								new sap.m.Image({src:"images/nonVegCategory.png", decorative: false, alt: "Non Veg"}),
								new sap.m.Image({src:"images/curryCategory.png", decorative: false, alt: "Curry"}),
								new sap.m.Image({src:"images/snacks.jpg", decorative: false, alt: "Snacks"}),
								new sap.m.Image({src:"images/sweets.jpg", decorative: false, alt: "Sweets"}),
								new sap.m.Image({src:"images/softDrinks.jpg", decorative: false, alt: "Soft Drinks"}),
								new sap.m.Image({src:"images/frozen.jpg", decorative: false, alt: "Frozen"}),
								new sap.m.Image({src:"images/iceCream.jpg", decorative: false, alt: "Ice Cream"})
							],
							pageChanged: function(oEvent){
								var oId = oEvent.getParameter('newActivePageId');
								var oCarCat = sap.ui.getCore().byId(oId).getAlt();
								sap.ui.getCore().byId('idCarText').setText(oCarCat);
							}
						}),
						new sap.m.Text({id:"idCarText", text: "Fruits"}).addStyleClass('clDialogText'),
						new sap.m.Label({text: "Type name of Item"}),
						new sap.m.Input({
							id: "id_name",
							width: "12em"
						}),
						new sap.m.Label({text: "Type quantity"}),
						new sap.m.Input({
							id: "id_quantity",
							width: "12em",
							type: sap.m.InputType.Number,
						}),
						new sap.m.Label({text: "Select unit"}),
						new sap.m.Select({
							id: "id_unit",
							width: "12em",
							items: [
								new sap.ui.core.Item({
									key: 59,
									text: " "
								}),
								new sap.ui.core.Item({
									key: 5,
									text: "pc"
								}),
								new sap.ui.core.Item({
									key: 6,
									text: "gm"
								}),
								new sap.ui.core.Item({
									key: 7,
									text: "kg"
								}),
								new sap.ui.core.Item({
									key: 93,
									text: "litre"
								}),
								new sap.ui.core.Item({
									key: 8,
									text: "bowl"
								}),
								new sap.ui.core.Item({
									key: 9,
									text: "packet"
								}),
								new sap.ui.core.Item({
									key: 91,
									text: "bottle"
								}),
								new sap.ui.core.Item({
									key: 92,
									text: "glass"
								}),new sap.ui.core.Item({
									key: 94,
									text: "dozen"
								}),new sap.ui.core.Item({
									key: 95,
									text: "can"
								}),
								new sap.ui.core.Item({
									key: 96,
									text: "box"
								})
								
							]
						})
					]
				})],
				beginButton: new sap.m.Button({
					text: 'Store Item',
					type: "Accept",
					press: function() {
						var oBusyDialog = new sap.m.BusyDialog({text:"Processing..."});
						oBusyDialog.open();
						
						var oImageId = sap.ui.getCore().byId('id_car').getActivePage();							
						var oCategory = sap.ui.getCore().byId(oImageId).getAlt();
						
						var oName = sap.ui.getCore().byId('id_name').getValue();
						var oQuantity = sap.ui.getCore().byId('id_quantity').getValue();
						var oUnit = sap.ui.getCore().byId('id_unit').getSelectedItem().mProperties.text
						var oDate = new Date();
						oDate = oDate.toDateString();
						$.ajax({
							url: "https://script.google.com/macros/s/AKfycbyGHG6CJxLbg2vvXY3R3N8wGppxykVK6cLcdFgO3biVuSWh-Kc/exec?category=" +
								oCategory + "&name=" +
								oName + "&qty=" + oQuantity + "&unit=" + oUnit + "&daysold=" + oDate +
								"&id=1V31iqLrZjtAakX-FztCBh2XWbWTACAdHwr_ohjH8NIY",
							type: "POST",
						});
						
						jQuery.sap.delayedCall(1000, this , function () {
							oBusyDialog.close();
							
							that.oDialogAdd.close();
							sap.ui.getCore().byId('id_name').setValue(" ");
							sap.ui.getCore().byId('id_quantity').setValue(" ");
							sap.ui.getCore().byId('id_unit').setSelectedKey(59);
						});
						
						sap.ui.getCore().byId('idview22--id_SyncMaster').addStyleClass('clSyncButton');
						sap.ui.getCore().byId('idview33--id_SyncCheckL').addStyleClass('clSyncButton');
					}
				}),

				endButton: new sap.m.Button({
					text: 'Cancel',
					type: "Reject",
					press: function() {
						that.oDialogAdd.close();
						sap.ui.getCore().byId('id_name').setValue(" ");
						sap.ui.getCore().byId('id_quantity').setValue(" ");
						sap.ui.getCore().byId('id_unit').setSelectedKey(59);
					}
				})
			});
		}
		that.oDialogAdd.open();

	},

	/*onDelete: function() {

		var sUrl = "https://spreadsheets.google.com/feeds/list/1V31iqLrZjtAakX-FztCBh2XWbWTACAdHwr_ohjH8NIY/od6/public/values?alt=json";
		var oJsonModel = new sap.ui.model.json.JSONModel();
		var that = this;
		$.getJSON(sUrl, function(data) {
			var aData = data.feed.entry;
			oJsonModel.setData(aData);
			that.oDialogRemove.setModel(oJsonModel);
			that.oDialogRemove.open();
		});

		if (!that.oDialogRemove) {
			that.oDialogRemove = new sap.m.Dialog({
				title: "Remove from Fridge",
				stretch: true,
				content: [new sap.m.VBox({
					alignItems: "Center",
					justifyContent: "SpaceAround",
					items: [
						new sap.m.Select({
							id: "id_select_remove",
							width: "12em",
							items: {
								path: "/",
								template: new sap.ui.core.ListItem({
									key: "{gsx$name/$t}",
									text: "{gsx$name/$t}",
									additionalText: "{gsx$category/$t}"
								})
							}

						})
					]
				})],
				beginButton: new sap.m.Button({
					text: 'Remove from Fridge',
					press: function() {
						var oBusyDialog = new sap.m.BusyDialog({text:"Processing..."});
						oBusyDialog.open();
						var oName2 = sap.ui.getCore().byId('id_select_remove').getSelectedItem().mProperties.text;

						$.ajax({
							url: "https://script.google.com/macros/s/AKfycbyGHG6CJxLbg2vvXY3R3N8wGppxykVK6cLcdFgO3biVuSWh-Kc/exec?name=" + oName2 +
								"&id=1V31iqLrZjtAakX-FztCBh2XWbWTACAdHwr_ohjH8NIY",
							type: "GET",
						});
						
						jQuery.sap.delayedCall(1000, this , function () {
							oBusyDialog.close();
						});
					}
				}),
				endButton: new sap.m.Button({
					text: 'Close',
					press: function() {
						that.oDialogRemove.close();
					}
				})

			});

		}

	},*/
	
	onAvailable: function(){
		
		app.to(pageList);
		
	},
	onApple: function(){

		var that = this;
		if (!that.oDialogApple) {
			that.oDialogApple = new sap.m.Dialog({
				title: "Item: Apple",
				stretch: true,
				content: [new sap.m.VBox({
					alignItems: "Center",
					justifyContent: "SpaceAround",
					items: [
						new sap.m.Image({
							src: "images/apples.png"
						}),

						new sap.m.Select({
							id: "id_select_action",
							width: "12em",
							items: [new sap.ui.core.Item({
									key: 51,
									text: "Add"
								}),
								new sap.ui.core.Item({
									key: 52,
									text: "Remove"
								})
							],
							change: function(oEvent) {
								if (oEvent.getSource().mProperties.selectedKey == "52") {
									sap.ui.getCore().byId('id_inpApple').setVisible(false);
									sap.ui.getCore().byId('id_unitApple').setVisible(false);
									sap.ui.getCore().byId('id_lbApple1').setVisible(false);
									sap.ui.getCore().byId('id_lbApple2').setVisible(false);
								} else {
									sap.ui.getCore().byId('id_inpApple').setVisible(true);
									sap.ui.getCore().byId('id_unitApple').setVisible(true);
									sap.ui.getCore().byId('id_lbApple1').setVisible(true);
									sap.ui.getCore().byId('id_lbApple2').setVisible(true);
								}
							}
						}),
						new sap.m.Label({id: "id_lbApple1", text: "Type quantity"}),
						new sap.m.Input({
							id: "id_inpApple",
							width: "12em",
							type: sap.m.InputType.Number
						}),
						new sap.m.Label({id: "id_lbApple2", text: "Select unit"}),
						new sap.m.Select({
							id: "id_unitApple",
							width: "12em",
							items: [
								new sap.ui.core.Item({
									key: 51,
									text: " "
								}),
								new sap.ui.core.Item({
									key: 5,
									text: "pc"
								}),
								new sap.ui.core.Item({
									key: 6,
									text: "gm"
								}),
								new sap.ui.core.Item({
									key: 7,
									text: "kg"
								})
							]
						})

					]
				})],
				beginButton: new sap.m.Button({
					text: 'Proceed',
					type: "Emphasized",
					press: function() {
						var oBusyDialog = new sap.m.BusyDialog({text:"Processing..."});
						oBusyDialog.open();
						if (sap.ui.getCore().byId('id_select_action').getSelectedKey() == "51") {
							var oQuantity = sap.ui.getCore().byId('id_inpApple').getValue();
							var oUnit = sap.ui.getCore().byId('id_unitApple').getSelectedItem().mProperties.text;

							var oDate = new Date();
							oDate = oDate.toDateString();
							$.ajax({
								url: "https://script.google.com/macros/s/AKfycbyGHG6CJxLbg2vvXY3R3N8wGppxykVK6cLcdFgO3biVuSWh-Kc/exec?category=Fruit&name=Apple&qty=" +
									oQuantity + "&unit=" + oUnit + "&daysold=" + oDate +
									"&id=1V31iqLrZjtAakX-FztCBh2XWbWTACAdHwr_ohjH8NIY",
								type: "POST",
							});

						} else {
							var oName2 = "Apple";
							var oName3 = "apple";
							$.ajax({
								url: "https://script.google.com/macros/s/AKfycbyGHG6CJxLbg2vvXY3R3N8wGppxykVK6cLcdFgO3biVuSWh-Kc/exec?name=" + oName2 +
									"&id=1V31iqLrZjtAakX-FztCBh2XWbWTACAdHwr_ohjH8NIY",
								type: "GET",
							});
							$.ajax({
								url: "https://script.google.com/macros/s/AKfycbyGHG6CJxLbg2vvXY3R3N8wGppxykVK6cLcdFgO3biVuSWh-Kc/exec?name=" + oName3 +
									"&id=1V31iqLrZjtAakX-FztCBh2XWbWTACAdHwr_ohjH8NIY",
								type: "GET",
							});
							
						}
						jQuery.sap.delayedCall(1000, this , function () {
							oBusyDialog.close();
							that.oDialogApple.close();
							sap.ui.getCore().byId('id_inpApple').setValue(' ');
							sap.ui.getCore().byId('id_unitApple').setSelectedKey(51);
						});
						
						sap.ui.getCore().byId('idview22--id_SyncMaster').addStyleClass('clSyncButton');
						sap.ui.getCore().byId('idview33--id_SyncCheckL').addStyleClass('clSyncButton');

					}
				}),
				endButton: new sap.m.Button({
					text: 'Cancel',
					type: "Reject",
					press: function() {
						that.oDialogApple.close();
						sap.ui.getCore().byId('id_inpApple').setValue(' ');
						sap.ui.getCore().byId('id_unitApple').setSelectedKey(51);
					}
				})

			});

		}
		that.oDialogApple.open();
	},
	
	onRice: function(){

		var that = this;
		if (!that.oDialogRice) {
			that.oDialogRice = new sap.m.Dialog({
				title: "Item: Rice",
				stretch: true,
				content: [new sap.m.VBox({
					alignItems: "Center",
					justifyContent: "SpaceAround",
					items: [
						new sap.m.Text({text: "Tap Image to quicksave one plate rice"}),
						new sap.m.Image({
							src: "images/riceLarge.jpg",
							press: function(){
								var oBusyDialog = new sap.m.BusyDialog({text:"Processing..."});
								oBusyDialog.open();
								
								var oDate = new Date();
								oDate = oDate.toDateString();
								$.ajax({
									url: "https://script.google.com/macros/s/AKfycbyGHG6CJxLbg2vvXY3R3N8wGppxykVK6cLcdFgO3biVuSWh-Kc/exec?category=Cereal&name=Rice&qty=1&unit=plate&daysold=" + oDate +
										"&id=1V31iqLrZjtAakX-FztCBh2XWbWTACAdHwr_ohjH8NIY",
									type: "POST",
								});
								
								jQuery.sap.delayedCall(1000, this , function () {
									oBusyDialog.close();
									that.oDialogRice.close();
									sap.ui.getCore().byId('id_inpRice').setValue(' ');
									sap.ui.getCore().byId('id_unitRice').setSelectedKey(51);
									sap.ui.getCore().byId('id_select_rice').setSelectedKey(25);
								});
								
								
							}
						}),

						new sap.m.Select({
							id: "id_select_action",
							width: "12em",
							items: [new sap.ui.core.Item({
									key: 51,
									text: "Add"
								}),
								new sap.ui.core.Item({
									key: 52,
									text: "Remove"
								})
							],
							change: function(oEvent) {
								if (oEvent.getSource().mProperties.selectedKey == "52") {
									sap.ui.getCore().byId('id_inpRice').setVisible(false);
									sap.ui.getCore().byId('id_unitRice').setVisible(false);
									sap.ui.getCore().byId('id_lbRice1').setVisible(false);
									sap.ui.getCore().byId('id_lbRice2').setVisible(false);
									sap.ui.getCore().byId('id_lbRice').setVisible(false);
									sap.ui.getCore().byId('id_select_rice').setVisible(false);
								} else {
									sap.ui.getCore().byId('id_inpRice').setVisible(true);
									sap.ui.getCore().byId('id_unitRice').setVisible(true);
									sap.ui.getCore().byId('id_lbRice1').setVisible(true);
									sap.ui.getCore().byId('id_lbRice2').setVisible(true);
									sap.ui.getCore().byId('id_lbRice').setVisible(true);
									sap.ui.getCore().byId('id_select_rice').setVisible(true);
								}
							}
						}),
						new sap.m.Label({id: "id_lbRice", text: "Select Rice Type"}),
						new sap.m.Select({
							id: "id_select_rice",
							width: "12em",
							items: [
								new sap.ui.core.Item({
									key: 25,
									text: " "
								}),
								new sap.ui.core.Item({
									key: 21,
									text: "Rice"
								}),
								new sap.ui.core.Item({
									key: 22,
									text: "Pulao"
								}),
								new sap.ui.core.Item({
									key: 23,
									text: "Fried Rice"
								}),
								new sap.ui.core.Item({
									key: 24,
									text: "Biryani"
								})
							]
						}),
						new sap.m.Label({id: "id_lbRice1", text: "Type quantity"}),
						new sap.m.Input({
							id: "id_inpRice",
							width: "12em",
							type: sap.m.InputType.Number
						}),
						new sap.m.Label({id: "id_lbRice2", text: "Select unit"}),
						new sap.m.Select({
							id: "id_unitRice",
							width: "12em",
							items: [
								new sap.ui.core.Item({
									key: 51,
									text: " "
								}),
								new sap.ui.core.Item({
									key: 5,
									text: "plate"
								}),
								new sap.ui.core.Item({
									key: 6,
									text: "bowl"
								})
							]
						})

					]
				})],
				beginButton: new sap.m.Button({
					text: 'Proceed',
					type: "Emphasized",
					press: function() {
						var oBusyDialog = new sap.m.BusyDialog({text:"Processing..."});
						oBusyDialog.open();
						if (sap.ui.getCore().byId('id_select_action').getSelectedKey() == "51") {
							var oItem = sap.ui.getCore().byId('id_select_rice').getSelectedItem().mProperties.text;
							var oQuantity = sap.ui.getCore().byId('id_inpRice').getValue();
							var oUnit = sap.ui.getCore().byId('id_unitRice').getSelectedItem().mProperties.text;

							var oDate = new Date();
							oDate = oDate.toDateString();
							$.ajax({
								url: "https://script.google.com/macros/s/AKfycbyGHG6CJxLbg2vvXY3R3N8wGppxykVK6cLcdFgO3biVuSWh-Kc/exec?category=Cereal&name=" + oItem + "&qty=" +
									oQuantity + "&unit=" + oUnit + "&daysold=" + oDate +
									"&id=1V31iqLrZjtAakX-FztCBh2XWbWTACAdHwr_ohjH8NIY",
								type: "POST",
							});

						} else {
							var oName2 = "Rice";
							var oName3 = "rice";
							$.ajax({
								url: "https://script.google.com/macros/s/AKfycbyGHG6CJxLbg2vvXY3R3N8wGppxykVK6cLcdFgO3biVuSWh-Kc/exec?name=" + oName2 +
									"&id=1V31iqLrZjtAakX-FztCBh2XWbWTACAdHwr_ohjH8NIY",
								type: "GET",
							});
							$.ajax({
								url: "https://script.google.com/macros/s/AKfycbyGHG6CJxLbg2vvXY3R3N8wGppxykVK6cLcdFgO3biVuSWh-Kc/exec?name=" + oName3 +
									"&id=1V31iqLrZjtAakX-FztCBh2XWbWTACAdHwr_ohjH8NIY",
								type: "GET",
							});
							
						}
						jQuery.sap.delayedCall(1000, this , function () {
							oBusyDialog.close();
							that.oDialogRice.close();
							sap.ui.getCore().byId('id_inpRice').setValue(' ');
							sap.ui.getCore().byId('id_unitRice').setSelectedKey(51);
							sap.ui.getCore().byId('id_select_rice').setSelectedKey(25);
						});
						
						sap.ui.getCore().byId('idview22--id_SyncMaster').addStyleClass('clSyncButton');
						sap.ui.getCore().byId('idview33--id_SyncCheckL').addStyleClass('clSyncButton');

					}
				}),
				endButton: new sap.m.Button({
					text: 'Cancel',
					type: "Reject",
					press: function() {
						that.oDialogRice.close();
						sap.ui.getCore().byId('id_inpRice').setValue(' ');
						sap.ui.getCore().byId('id_unitRice').setSelectedKey(51);
						sap.ui.getCore().byId('id_select_rice').setSelectedKey(25);
					}
				})

			});

		}
		that.oDialogRice.open();
	},
	
	onDal: function(){

		var that = this;
		if (!that.oDialogDal) {
			that.oDialogDal = new sap.m.Dialog({
				title: "Item: Dal",
				stretch: true,
				content: [new sap.m.VBox({
					alignItems: "Center",
					justifyContent: "SpaceAround",
					items: [
						new sap.m.Text({text: "Tap Image to quicksave one bowl dal"}),
						new sap.m.Image({
							src: "images/dalLarge.jpg",
							press: function(){
								var oBusyDialog = new sap.m.BusyDialog({text:"Processing..."});
								oBusyDialog.open();
								
								var oDate = new Date();
								oDate = oDate.toDateString();
								$.ajax({
									url: "https://script.google.com/macros/s/AKfycbyGHG6CJxLbg2vvXY3R3N8wGppxykVK6cLcdFgO3biVuSWh-Kc/exec?category=Cereal&name=Dal&qty=1&unit=bowl&daysold=" + oDate +
										"&id=1V31iqLrZjtAakX-FztCBh2XWbWTACAdHwr_ohjH8NIY",
									type: "POST",
								});
								
								jQuery.sap.delayedCall(1000, this , function () {
									oBusyDialog.close();
									that.oDialogDal.close();
									sap.ui.getCore().byId('id_inpDal').setValue(' ');
									sap.ui.getCore().byId('id_unitdal').setSelectedKey(51);
									sap.ui.getCore().byId('id_select_dal').setSelectedKey(25);
								});
								
								
							}
						}),

						new sap.m.Select({
							id: "id_select_action",
							width: "12em",
							items: [new sap.ui.core.Item({
									key: 51,
									text: "Add"
								}),
								new sap.ui.core.Item({
									key: 52,
									text: "Remove"
								})
							],
							change: function(oEvent) {
								if (oEvent.getSource().mProperties.selectedKey == "52") {
									sap.ui.getCore().byId('id_inpDal').setVisible(false);
									sap.ui.getCore().byId('id_unitDal').setVisible(false);
									sap.ui.getCore().byId('id_lbDal1').setVisible(false);
									sap.ui.getCore().byId('id_lbDal2').setVisible(false);
									sap.ui.getCore().byId('id_lbDal').setVisible(false);
									sap.ui.getCore().byId('id_select_dal').setVisible(false);
								} else {
									sap.ui.getCore().byId('id_inpDal').setVisible(true);
									sap.ui.getCore().byId('id_unitDal').setVisible(true);
									sap.ui.getCore().byId('id_lbDal1').setVisible(true);
									sap.ui.getCore().byId('id_lbDal2').setVisible(true);
									sap.ui.getCore().byId('id_lbDal').setVisible(true);
									sap.ui.getCore().byId('id_select_dal').setVisible(true);
								}
							}
						}),
						new sap.m.Label({id: "id_lbDal", text: "Select Dal Type"}),
						new sap.m.Select({
							id: "id_select_dal",
							width: "12em",
							items: [
								new sap.ui.core.Item({
									key: 25,
									text: " "
								}),
								new sap.ui.core.Item({
									key: 21,
									text: "Dal"
								}),
								new sap.ui.core.Item({
									key: 22,
									text: "Chana Dal"
								}),
								new sap.ui.core.Item({
									key: 23,
									text: "Moong Dal"
								})
							]
						}),
						new sap.m.Label({id: "id_lbDal1", text: "Type quantity"}),
						new sap.m.Input({
							id: "id_inpDal",
							width: "12em",
							type: sap.m.InputType.Number
						}),
						new sap.m.Label({id: "id_lbDal2", text: "Select unit"}),
						new sap.m.Select({
							id: "id_unitDal",
							width: "12em",
							items: [
								new sap.ui.core.Item({
									key: 51,
									text: " "
								}),
								new sap.ui.core.Item({
									key: 5,
									text: "kadhai"
								}),
								new sap.ui.core.Item({
									key: 6,
									text: "bowl"
								})
							]
						})

					]
				})],
				beginButton: new sap.m.Button({
					text: 'Proceed',
					type: "Emphasized",
					press: function() {
						var oBusyDialog = new sap.m.BusyDialog({text:"Processing..."});
						oBusyDialog.open();
						if (sap.ui.getCore().byId('id_select_action').getSelectedKey() == "51") {
							var oItem = sap.ui.getCore().byId('id_select_dal').getSelectedItem().mProperties.text;
							var oQuantity = sap.ui.getCore().byId('id_inpDal').getValue();
							var oUnit = sap.ui.getCore().byId('id_unitDal').getSelectedItem().mProperties.text;

							var oDate = new Date();
							oDate = oDate.toDateString();
							$.ajax({
								url: "https://script.google.com/macros/s/AKfycbyGHG6CJxLbg2vvXY3R3N8wGppxykVK6cLcdFgO3biVuSWh-Kc/exec?category=Cereal&name=" + oItem + "&qty=" +
									oQuantity + "&unit=" + oUnit + "&daysold=" + oDate +
									"&id=1V31iqLrZjtAakX-FztCBh2XWbWTACAdHwr_ohjH8NIY",
								type: "POST",
							});

						} else {
							var oName2 = "Dal";
							var oName3 = "dal";
							$.ajax({
								url: "https://script.google.com/macros/s/AKfycbyGHG6CJxLbg2vvXY3R3N8wGppxykVK6cLcdFgO3biVuSWh-Kc/exec?name=" + oName2 +
									"&id=1V31iqLrZjtAakX-FztCBh2XWbWTACAdHwr_ohjH8NIY",
								type: "GET",
							});
							$.ajax({
								url: "https://script.google.com/macros/s/AKfycbyGHG6CJxLbg2vvXY3R3N8wGppxykVK6cLcdFgO3biVuSWh-Kc/exec?name=" + oName3 +
									"&id=1V31iqLrZjtAakX-FztCBh2XWbWTACAdHwr_ohjH8NIY",
								type: "GET",
							});
							
						}
						jQuery.sap.delayedCall(1000, this , function () {
							oBusyDialog.close();
							that.oDialogDal.close();
							sap.ui.getCore().byId('id_inpDal').setValue(' ');
							sap.ui.getCore().byId('id_unitDal').setSelectedKey(51);
							sap.ui.getCore().byId('id_select_dal').setSelectedKey(25);
						});
						
						sap.ui.getCore().byId('idview22--id_SyncMaster').addStyleClass('clSyncButton');
						sap.ui.getCore().byId('idview33--id_SyncCheckL').addStyleClass('clSyncButton');

					}
				}),
				endButton: new sap.m.Button({
					text: 'Cancel',
					type: "Reject",
					press: function() {
						that.oDialogDal.close();
						sap.ui.getCore().byId('id_inpDal').setValue(' ');
						sap.ui.getCore().byId('id_unitDal').setSelectedKey(51);
						sap.ui.getCore().byId('id_select_dal').setSelectedKey(25);
					}
				})

			});

		}
		that.oDialogDal.open();
	},
	
	onBhaji: function(){

		var that = this;
		if (!that.oDialogBhaji) {
			that.oDialogBhaji = new sap.m.Dialog({
				title: "Item: Bhaji",
				stretch: true,
				content: [new sap.m.VBox({
					alignItems: "Center",
					justifyContent: "SpaceAround",
					items: [
						new sap.m.Text({text: "Tap Image to quicksave one plate bhaji"}),
						new sap.m.Image({
							src: "images/bhajiLarge.jpg",
							press: function(){
								var oBusyDialog = new sap.m.BusyDialog({text:"Processing..."});
								oBusyDialog.open();
								
								var oDate = new Date();
								oDate = oDate.toDateString();
								$.ajax({
									url: "https://script.google.com/macros/s/AKfycbyGHG6CJxLbg2vvXY3R3N8wGppxykVK6cLcdFgO3biVuSWh-Kc/exec?category=Curry&name=Bhaji&qty=1&unit=plate&daysold=" + oDate +
										"&id=1V31iqLrZjtAakX-FztCBh2XWbWTACAdHwr_ohjH8NIY",
									type: "POST",
								});
								
								jQuery.sap.delayedCall(1000, this , function () {
									oBusyDialog.close();
									that.oDialogBhaji.close();
									sap.ui.getCore().byId('id_inpBhaji').setValue(' ');
									sap.ui.getCore().byId('id_unitBhaji').setSelectedKey(51);
									sap.ui.getCore().byId('id_select_bhaji').setSelectedKey(25);
								});
								
								
							}
						}),

						new sap.m.Select({
							id: "id_select_action",
							width: "12em",
							items: [new sap.ui.core.Item({
									key: 51,
									text: "Add"
								}),
								new sap.ui.core.Item({
									key: 52,
									text: "Remove"
								})
							],
							change: function(oEvent) {
								if (oEvent.getSource().mProperties.selectedKey == "52") {
									sap.ui.getCore().byId('id_inpBhaji').setVisible(false);
									sap.ui.getCore().byId('id_unitBhaji').setVisible(false);
									sap.ui.getCore().byId('id_lbBhaji1').setVisible(false);
									sap.ui.getCore().byId('id_lbBhaji2').setVisible(false);
									sap.ui.getCore().byId('id_lbBhaji').setVisible(false);
									sap.ui.getCore().byId('id_select_bhaji').setVisible(false);
								} else {
									sap.ui.getCore().byId('id_inpBhaji').setVisible(true);
									sap.ui.getCore().byId('id_unitBhaji').setVisible(true);
									sap.ui.getCore().byId('id_lbBhaji1').setVisible(true);
									sap.ui.getCore().byId('id_lbBhaji2').setVisible(true);
									sap.ui.getCore().byId('id_lbBhaji').setVisible(true);
									sap.ui.getCore().byId('id_select_bhaji').setVisible(true);
								}
							}
						}),
						new sap.m.Label({id: "id_lbBhaji", text: "Select Bhaji"}),
						new sap.m.Select({
							id: "id_select_bhaji",
							width: "12em",
							items: [
								new sap.ui.core.Item({
									key: 25,
									text: " "
								}),
								new sap.ui.core.Item({
									key: 21,
									text: "Bhaji"
								}),
								new sap.ui.core.Item({
									key: 22,
									text: "Aaloo Bhaji"
								})
							]
						}),
						new sap.m.Label({id: "id_lbBhaji1", text: "Type quantity"}),
						new sap.m.Input({
							id: "id_inpBhaji",
							width: "12em",
							type: sap.m.InputType.Number
						}),
						new sap.m.Label({id: "id_lbBhaji2", text: "Select unit"}),
						new sap.m.Select({
							id: "id_unitBhaji",
							width: "12em",
							items: [
								new sap.ui.core.Item({
									key: 51,
									text: " "
								}),
								new sap.ui.core.Item({
									key: 5,
									text: "plate"
								}),
								new sap.ui.core.Item({
									key: 6,
									text: "bowl"
								})
							]
						})

					]
				})],
				beginButton: new sap.m.Button({
					text: 'Proceed',
					type: "Emphasized",
					press: function() {
						var oBusyDialog = new sap.m.BusyDialog({text:"Processing..."});
						oBusyDialog.open();
						if (sap.ui.getCore().byId('id_select_action').getSelectedKey() == "51") {
							var oItem = sap.ui.getCore().byId('id_select_bhaji').getSelectedItem().mProperties.text;
							var oQuantity = sap.ui.getCore().byId('id_inpBhaji').getValue();
							var oUnit = sap.ui.getCore().byId('id_unitBhaji').getSelectedItem().mProperties.text;

							var oDate = new Date();
							oDate = oDate.toDateString();
							$.ajax({
								url: "https://script.google.com/macros/s/AKfycbyGHG6CJxLbg2vvXY3R3N8wGppxykVK6cLcdFgO3biVuSWh-Kc/exec?category=Curry&name=" + oItem + "&qty=" +
									oQuantity + "&unit=" + oUnit + "&daysold=" + oDate +
									"&id=1V31iqLrZjtAakX-FztCBh2XWbWTACAdHwr_ohjH8NIY",
								type: "POST",
							});

						} else {
							var oName2 = "Bhaji";
							var oName3 = "bhaji";
							$.ajax({
								url: "https://script.google.com/macros/s/AKfycbyGHG6CJxLbg2vvXY3R3N8wGppxykVK6cLcdFgO3biVuSWh-Kc/exec?name=" + oName2 +
									"&id=1V31iqLrZjtAakX-FztCBh2XWbWTACAdHwr_ohjH8NIY",
								type: "GET",
							});
							$.ajax({
								url: "https://script.google.com/macros/s/AKfycbyGHG6CJxLbg2vvXY3R3N8wGppxykVK6cLcdFgO3biVuSWh-Kc/exec?name=" + oName3 +
									"&id=1V31iqLrZjtAakX-FztCBh2XWbWTACAdHwr_ohjH8NIY",
								type: "GET",
							});
							
						}
						jQuery.sap.delayedCall(1000, this , function () {
							oBusyDialog.close();
							that.oDialogBhaji.close();
							sap.ui.getCore().byId('id_inpBhaji').setValue(' ');
							sap.ui.getCore().byId('id_unitBhaji').setSelectedKey(51);
							sap.ui.getCore().byId('id_select_bhaji').setSelectedKey(25);
						});
						
						sap.ui.getCore().byId('idview22--id_SyncMaster').addStyleClass('clSyncButton');
						sap.ui.getCore().byId('idview33--id_SyncCheckL').addStyleClass('clSyncButton');

					}
				}),
				endButton: new sap.m.Button({
					text: 'Cancel',
					type: "Reject",
					press: function() {
						that.oDialogBhaji.close();
						sap.ui.getCore().byId('id_inpBhaji').setValue(' ');
						sap.ui.getCore().byId('id_unitBhaji').setSelectedKey(51);
						sap.ui.getCore().byId('id_select_bhaji').setSelectedKey(25);
					}
				})

			});

		}
		that.oDialogBhaji.open();
	},
	
	onSabji: function(){

		var that = this;
		if (!that.oDialogSabji) {
			that.oDialogSabji = new sap.m.Dialog({
				title: "Item: Sabji/Curry",
				stretch: true,
				content: [new sap.m.VBox({
					alignItems: "Center",
					justifyContent: "SpaceAround",
					items: [
						new sap.m.Text({text: "Tap Image to quicksave one bowl sabji"}),
						new sap.m.Image({
							src: "images/sabjiLarge.jpg",
							press: function(){
								var oBusyDialog = new sap.m.BusyDialog({text:"Processing..."});
								oBusyDialog.open();
								
								var oDate = new Date();
								oDate = oDate.toDateString();
								$.ajax({
									url: "https://script.google.com/macros/s/AKfycbyGHG6CJxLbg2vvXY3R3N8wGppxykVK6cLcdFgO3biVuSWh-Kc/exec?category=Curry&name=Sabji&qty=1&unit=bowl&daysold=" + oDate +
										"&id=1V31iqLrZjtAakX-FztCBh2XWbWTACAdHwr_ohjH8NIY",
									type: "POST",
								});
								
								jQuery.sap.delayedCall(1000, this , function () {
									oBusyDialog.close();
									that.oDialogSabji.close();
									sap.ui.getCore().byId('id_inpSabji').setValue(' ');
									sap.ui.getCore().byId('id_unitSabji').setSelectedKey(51);
									sap.ui.getCore().byId('id_select_sabji').setSelectedKey(25);
								});
								
								
							}
						}),

						new sap.m.Select({
							id: "id_select_action",
							width: "12em",
							items: [new sap.ui.core.Item({
									key: 51,
									text: "Add"
								}),
								new sap.ui.core.Item({
									key: 52,
									text: "Remove"
								})
							],
							change: function(oEvent) {
								if (oEvent.getSource().mProperties.selectedKey == "52") {
									sap.ui.getCore().byId('id_inpSabji').setVisible(false);
									sap.ui.getCore().byId('id_unitSabji').setVisible(false);
									sap.ui.getCore().byId('id_lbSabji1').setVisible(false);
									sap.ui.getCore().byId('id_lbSabji2').setVisible(false);
									sap.ui.getCore().byId('id_lbSabji').setVisible(false);
									sap.ui.getCore().byId('id_select_sabji').setVisible(false);
								} else {
									sap.ui.getCore().byId('id_inpSabji').setVisible(true);
									sap.ui.getCore().byId('id_unitSabji').setVisible(true);
									sap.ui.getCore().byId('id_lbSabji1').setVisible(true);
									sap.ui.getCore().byId('id_lbSabji2').setVisible(true);
									sap.ui.getCore().byId('id_lbSabji').setVisible(true);
									sap.ui.getCore().byId('id_select_sabji').setVisible(true);
								}
							}
						}),
						new sap.m.Label({id: "id_lbSabji", text: "Select Sabji"}),
						new sap.m.Select({
							id: "id_select_sabji",
							width: "12em",
							items: [
								new sap.ui.core.Item({
									key: 25,
									text: " "
								}),
								new sap.ui.core.Item({
									key: 21,
									text: "Sabji"
								}),
								new sap.ui.core.Item({
									key: 22,
									text: "Chicken Curry"
								}),
								new sap.ui.core.Item({
									key: 23,
									text: "Egg Curry"
								}),
								new sap.ui.core.Item({
									key: 24,
									text: "Paneer Curry"
								}),
								new sap.ui.core.Item({
									key: 27,
									text: "Fish Curry"
								}),
								new sap.ui.core.Item({
									key: 26,
									text: "Soyabean Curry"
								})
							]
						}),
						new sap.m.Label({id: "id_lbSabji1", text: "Type quantity"}),
						new sap.m.Input({
							id: "id_inpSabji",
							width: "12em",
							type: sap.m.InputType.Number
						}),
						new sap.m.Label({id: "id_lbSabji2", text: "Select unit"}),
						new sap.m.Select({
							id: "id_unitSabji",
							width: "12em",
							items: [
								new sap.ui.core.Item({
									key: 51,
									text: " "
								}),
								new sap.ui.core.Item({
									key: 5,
									text: "plate"
								}),
								new sap.ui.core.Item({
									key: 6,
									text: "bowl"
								}),
								new sap.ui.core.Item({
									key: 7,
									text: "kadhai"
								})
							]
						})

					]
				})],
				beginButton: new sap.m.Button({
					text: 'Proceed',
					type: "Emphasized",
					press: function() {
						var oBusyDialog = new sap.m.BusyDialog({text:"Processing..."});
						oBusyDialog.open();
						if (sap.ui.getCore().byId('id_select_action').getSelectedKey() == "51") {
							var oItem = sap.ui.getCore().byId('id_select_sabji').getSelectedItem().mProperties.text;
							var oQuantity = sap.ui.getCore().byId('id_inpSabji').getValue();
							var oUnit = sap.ui.getCore().byId('id_unitSabji').getSelectedItem().mProperties.text;

							var oDate = new Date();
							oDate = oDate.toDateString();
							$.ajax({
								url: "https://script.google.com/macros/s/AKfycbyGHG6CJxLbg2vvXY3R3N8wGppxykVK6cLcdFgO3biVuSWh-Kc/exec?category=Curry&name=" + oItem + "&qty=" +
									oQuantity + "&unit=" + oUnit + "&daysold=" + oDate +
									"&id=1V31iqLrZjtAakX-FztCBh2XWbWTACAdHwr_ohjH8NIY",
								type: "POST",
							});

						} else {
							var oName2 = "Sabji";
							var oName3 = "sabji";
							$.ajax({
								url: "https://script.google.com/macros/s/AKfycbyGHG6CJxLbg2vvXY3R3N8wGppxykVK6cLcdFgO3biVuSWh-Kc/exec?name=" + oName2 +
									"&id=1V31iqLrZjtAakX-FztCBh2XWbWTACAdHwr_ohjH8NIY",
								type: "GET",
							});
							$.ajax({
								url: "https://script.google.com/macros/s/AKfycbyGHG6CJxLbg2vvXY3R3N8wGppxykVK6cLcdFgO3biVuSWh-Kc/exec?name=" + oName3 +
									"&id=1V31iqLrZjtAakX-FztCBh2XWbWTACAdHwr_ohjH8NIY",
								type: "GET",
							});
							
						}
						jQuery.sap.delayedCall(1000, this , function () {
							oBusyDialog.close();
							that.oDialogSabji.close();
							sap.ui.getCore().byId('id_inpSabji').setValue(' ');
							sap.ui.getCore().byId('id_unitSabji').setSelectedKey(51);
							sap.ui.getCore().byId('id_select_sabji').setSelectedKey(25);
						});
						
						sap.ui.getCore().byId('idview22--id_SyncMaster').addStyleClass('clSyncButton');
						sap.ui.getCore().byId('idview33--id_SyncCheckL').addStyleClass('clSyncButton');

					}
				}),
				endButton: new sap.m.Button({
					text: 'Cancel',
					type: "Reject",
					press: function() {
						that.oDialogSabji.close();
						sap.ui.getCore().byId('id_inpSabji').setValue(' ');
						sap.ui.getCore().byId('id_unitSabji').setSelectedKey(51);
						sap.ui.getCore().byId('id_select_sabji').setSelectedKey(25);
					}
				})

			});

		}
		that.oDialogSabji.open();
	},
	
	onAtta: function(){

		var that = this;
		if (!that.oDialogAtta) {
			that.oDialogAtta = new sap.m.Dialog({
				title: "Item: Atta",
				stretch: true,
				content: [new sap.m.VBox({
					alignItems: "Center",
					justifyContent: "SpaceAround",
					items: [
						new sap.m.Text({text: "Tap Image to quicksave one bowl atta"}),
						new sap.m.Image({
							src: "images/attaLarge.jpg",
							press: function(){
								var oBusyDialog = new sap.m.BusyDialog({text:"Processing..."});
								oBusyDialog.open();
								
								var oDate = new Date();
								oDate = oDate.toDateString();
								$.ajax({
									url: "https://script.google.com/macros/s/AKfycbyGHG6CJxLbg2vvXY3R3N8wGppxykVK6cLcdFgO3biVuSWh-Kc/exec?category=Cereal&name=Atta&qty=1&unit=bowl&daysold=" + oDate +
										"&id=1V31iqLrZjtAakX-FztCBh2XWbWTACAdHwr_ohjH8NIY",
									type: "POST",
								});
								
								jQuery.sap.delayedCall(1000, this , function () {
									oBusyDialog.close();
									that.oDialogAtta.close();
									sap.ui.getCore().byId('id_inpAtta').setValue(' ');
									sap.ui.getCore().byId('id_unitAtta').setSelectedKey(51);
									sap.ui.getCore().byId('id_select_Atta').setSelectedKey(25);
								});
								
								
							}
						}),

						new sap.m.Select({
							id: "id_select_action",
							width: "12em",
							items: [new sap.ui.core.Item({
									key: 51,
									text: "Add"
								}),
								new sap.ui.core.Item({
									key: 52,
									text: "Remove"
								})
							],
							change: function(oEvent) {
								if (oEvent.getSource().mProperties.selectedKey == "52") {
									sap.ui.getCore().byId('id_inpAtta').setVisible(false);
									sap.ui.getCore().byId('id_unitAtta').setVisible(false);
									sap.ui.getCore().byId('id_lbAtta1').setVisible(false);
									sap.ui.getCore().byId('id_lbAtta2').setVisible(false);
									sap.ui.getCore().byId('id_lbAtta').setVisible(false);
									sap.ui.getCore().byId('id_select_Atta').setVisible(false);
								} else {
									sap.ui.getCore().byId('id_inpAtta').setVisible(true);
									sap.ui.getCore().byId('id_unitAtta').setVisible(true);
									sap.ui.getCore().byId('id_lbAtta1').setVisible(true);
									sap.ui.getCore().byId('id_lbAtta2').setVisible(true);
									sap.ui.getCore().byId('id_lbAtta').setVisible(true);
									sap.ui.getCore().byId('id_select_Atta').setVisible(true);
								}
							}
						}),
						new sap.m.Label({id: "id_lbAtta", text: "Select Atta/Maida"}),
						new sap.m.Select({
							id: "id_select_Atta",
							width: "12em",
							items: [
								new sap.ui.core.Item({
									key: 25,
									text: " "
								}),
								new sap.ui.core.Item({
									key: 21,
									text: "Atta"
								}),
								new sap.ui.core.Item({
									key: 22,
									text: "Maida"
								})
							]
						}),
						new sap.m.Label({id: "id_lbAtta1", text: "Type quantity"}),
						new sap.m.Input({
							id: "id_inpAtta",
							width: "12em",
							type: sap.m.InputType.Number
						}),
						new sap.m.Label({id: "id_lbAtta2", text: "Select unit"}),
						new sap.m.Select({
							id: "id_unitAtta",
							width: "12em",
							items: [
								new sap.ui.core.Item({
									key: 51,
									text: " "
								}),
								new sap.ui.core.Item({
									key: 6,
									text: "bowl"
								}),
								new sap.ui.core.Item({
									key: 7,
									text: "box"
								})
							]
						})

					]
				})],
				beginButton: new sap.m.Button({
					text: 'Proceed',
					type: "Emphasized",
					press: function() {
						var oBusyDialog = new sap.m.BusyDialog({text:"Processing..."});
						oBusyDialog.open();
						if (sap.ui.getCore().byId('id_select_action').getSelectedKey() == "51") {
							var oItem = sap.ui.getCore().byId('id_select_Atta').getSelectedItem().mProperties.text;
							var oQuantity = sap.ui.getCore().byId('id_inpAtta').getValue();
							var oUnit = sap.ui.getCore().byId('id_unitAtta').getSelectedItem().mProperties.text;

							var oDate = new Date();
							oDate = oDate.toDateString();
							$.ajax({
								url: "https://script.google.com/macros/s/AKfycbyGHG6CJxLbg2vvXY3R3N8wGppxykVK6cLcdFgO3biVuSWh-Kc/exec?category=Cereal&name=" + oItem + "&qty=" +
									oQuantity + "&unit=" + oUnit + "&daysold=" + oDate +
									"&id=1V31iqLrZjtAakX-FztCBh2XWbWTACAdHwr_ohjH8NIY",
								type: "POST",
							});

						} else {
							var oName2 = "Atta";
							var oName3 = "atta";
							$.ajax({
								url: "https://script.google.com/macros/s/AKfycbyGHG6CJxLbg2vvXY3R3N8wGppxykVK6cLcdFgO3biVuSWh-Kc/exec?name=" + oName2 +
									"&id=1V31iqLrZjtAakX-FztCBh2XWbWTACAdHwr_ohjH8NIY",
								type: "GET",
							});
							$.ajax({
								url: "https://script.google.com/macros/s/AKfycbyGHG6CJxLbg2vvXY3R3N8wGppxykVK6cLcdFgO3biVuSWh-Kc/exec?name=" + oName3 +
									"&id=1V31iqLrZjtAakX-FztCBh2XWbWTACAdHwr_ohjH8NIY",
								type: "GET",
							});
							
						}
						jQuery.sap.delayedCall(1000, this , function () {
							oBusyDialog.close();
							that.oDialogAtta.close();
							sap.ui.getCore().byId('id_inpAtta').setValue(' ');
							sap.ui.getCore().byId('id_unitAtta').setSelectedKey(51);
							sap.ui.getCore().byId('id_select_Atta').setSelectedKey(25);
						});
						
						sap.ui.getCore().byId('idview22--id_SyncMaster').addStyleClass('clSyncButton');
						sap.ui.getCore().byId('idview33--id_SyncCheckL').addStyleClass('clSyncButton');

					}
				}),
				endButton: new sap.m.Button({
					text: 'Cancel',
					type: "Reject",
					press: function() {
						that.oDialogAtta.close();
						sap.ui.getCore().byId('id_inpAtta').setValue(' ');
						sap.ui.getCore().byId('id_unitAtta').setSelectedKey(51);
						sap.ui.getCore().byId('id_select_Atta').setSelectedKey(25);
					}
				})

			});

		}
		that.oDialogAtta.open();
	},
	
	onMilk: function() {

		var that = this;
		if (!that.oDialogMilk) {
			that.oDialogMilk = new sap.m.Dialog({
				title: "Item: Milk",
				stretch: true,
				content: [new sap.m.VBox({
					alignItems: "Center",
					justifyContent: "SpaceAround",
					items: [
						new sap.m.Image({
							src: "images/milkLarge.jpg"
						}),

						new sap.m.Select({
							id: "id_select_actionMilk",
							width: '12em',
							items: [new sap.ui.core.Item({
									key: 51,
									text: "Add"
								}),
								new sap.ui.core.Item({
									key: 52,
									text: "Remove"
								})
							],
							change: function(oEvent) {
								if (oEvent.getSource().mProperties.selectedKey == "52") {
									sap.ui.getCore().byId('id_inpMilk').setVisible(false);
									sap.ui.getCore().byId('id_unitMilk').setVisible(false);
									sap.ui.getCore().byId('id_lbMilk1').setVisible(false);
									sap.ui.getCore().byId('id_lbMilk2').setVisible(false);
								} else {
									sap.ui.getCore().byId('id_inpMilk').setVisible(true);
									sap.ui.getCore().byId('id_unitMilk').setVisible(true);
									sap.ui.getCore().byId('id_lbMilk1').setVisible(true);
									sap.ui.getCore().byId('id_lbMilk2').setVisible(true);
								}
							}
						}),
						new sap.m.Label({id: "id_lbMilk1", text: "Type quantity"}),
						new sap.m.Input({
							id: "id_inpMilk",
							width: '12em',
							type: sap.m.InputType.Number
						}),
						new sap.m.Label({id: "id_lbMilk2", text: "Select unit"}),
						new sap.m.Select({
							id: "id_unitMilk",
							width: '12em',
							items: [
								new sap.ui.core.Item({
									key: 51,
									text: " "
								}),
								new sap.ui.core.Item({
									key: 5,
									text: "packet"
								}),
								new sap.ui.core.Item({
									key: 57,
									text: "milk pan"
								}),
								new sap.ui.core.Item({
									key: 6,
									text: "glass"
								}),
								new sap.ui.core.Item({
									key: 7,
									text: "litre"
								})
							]
						})

					]
				})],
				beginButton: new sap.m.Button({
					text: 'Proceed',
					type: "Emphasized",
					press: function() {
						var oBusyDialog = new sap.m.BusyDialog({text:"Processing..."});
						oBusyDialog.open();
						if (sap.ui.getCore().byId('id_select_actionMilk').getSelectedKey() == "51") {
							var oQuantity = sap.ui.getCore().byId('id_inpMilk').getValue();
							var oUnit = sap.ui.getCore().byId('id_unitMilk').getSelectedItem().mProperties.text;

							var oDate = new Date();
							oDate = oDate.toDateString();
							$.ajax({
								url: "https://script.google.com/macros/s/AKfycbyGHG6CJxLbg2vvXY3R3N8wGppxykVK6cLcdFgO3biVuSWh-Kc/exec?category=Dairy&name=Milk&qty=" +
									oQuantity + "&unit=" + oUnit + "&daysold=" + oDate +
									"&id=1V31iqLrZjtAakX-FztCBh2XWbWTACAdHwr_ohjH8NIY",
								type: "POST",
							});

						} else {
							var oName2 = "Milk";
							var oName3 = "milk";
							$.ajax({
								url: "https://script.google.com/macros/s/AKfycbyGHG6CJxLbg2vvXY3R3N8wGppxykVK6cLcdFgO3biVuSWh-Kc/exec?name=" + oName2 +
									"&id=1V31iqLrZjtAakX-FztCBh2XWbWTACAdHwr_ohjH8NIY",
								type: "GET",
							});
							$.ajax({
								url: "https://script.google.com/macros/s/AKfycbyGHG6CJxLbg2vvXY3R3N8wGppxykVK6cLcdFgO3biVuSWh-Kc/exec?name=" + oName3 +
									"&id=1V31iqLrZjtAakX-FztCBh2XWbWTACAdHwr_ohjH8NIY",
								type: "GET",
							});
							
						}
						jQuery.sap.delayedCall(1000, this , function () {
							oBusyDialog.close();
							that.oDialogMilk.close();
							sap.ui.getCore().byId('id_inpMilk').setValue(' ');
							sap.ui.getCore().byId('id_unitMilk').setSelectedKey(51);
						});
						
						sap.ui.getCore().byId('idview22--id_SyncMaster').addStyleClass('clSyncButton');
						sap.ui.getCore().byId('idview33--id_SyncCheckL').addStyleClass('clSyncButton');
					}
				}),
				endButton: new sap.m.Button({
					text: 'Cancel',
					type: "Reject",
					press: function() {
						that.oDialogMilk.close();
						sap.ui.getCore().byId('id_inpMilk').setValue(' ');
						sap.ui.getCore().byId('id_unitMilk').setSelectedKey(51);
					}
				})

			});

		}
		that.oDialogMilk.open();
	},

	onTomato: function() {

		var that = this;
		if (!that.oDialogTomato) {
			that.oDialogTomato = new sap.m.Dialog({
				title: "Item: Tomato",
				stretch: true,
				content: [new sap.m.VBox({
					alignItems: "Center",
					justifyContent: "SpaceAround",
					items: [
						new sap.m.Image({
							src: "images/tomatoLarge.jpg"
						}),

						new sap.m.Select({
							id: "id_select_actionTomato",
							width: '12em',
							items: [new sap.ui.core.Item({
									key: 51,
									text: "Add"
								}),
								new sap.ui.core.Item({
									key: 52,
									text: "Remove"
								})
							],
							change: function(oEvent) {
								if (oEvent.getSource().mProperties.selectedKey == "52") {
									sap.ui.getCore().byId('id_inpTomato').setVisible(false);
									sap.ui.getCore().byId('id_unitTomato').setVisible(false);
									sap.ui.getCore().byId('id_lbTomato1').setVisible(false);
									sap.ui.getCore().byId('id_lbTomato2').setVisible(false);
								} else {
									sap.ui.getCore().byId('id_inpTomato').setVisible(true);
									sap.ui.getCore().byId('id_unitTomato').setVisible(true);
									sap.ui.getCore().byId('id_lbTomato1').setVisible(true);
									sap.ui.getCore().byId('id_lbTomato2').setVisible(true);
								}
							}
						}),
						new sap.m.Label({id: "id_lbTomato1", text: "Type quantity"}),
						new sap.m.Input({
							id: "id_inpTomato",
							width: '12em',
							type: sap.m.InputType.Number
						}),
						new sap.m.Label({id: "id_lbTomato2", text: "Select unit"}),
						new sap.m.Select({
							id: "id_unitTomato",
							width: '12em',
							items: [
								new sap.ui.core.Item({
									key: 51,
									text: " "
								}),
								new sap.ui.core.Item({
									key: 5,
									text: "gm"
								}),
								new sap.ui.core.Item({
									key: 57,
									text: "kg"
								}),
								new sap.ui.core.Item({
									key: 6,
									text: "pc"
								})
							]
						})

					]
				})],
				beginButton: new sap.m.Button({
					text: 'Proceed',
					type: "Emphasized",
					press: function() {
						var oBusyDialog = new sap.m.BusyDialog({text:"Processing..."});
						oBusyDialog.open();
						if (sap.ui.getCore().byId('id_select_actionTomato').getSelectedKey() == "51") {
							var oQuantity = sap.ui.getCore().byId('id_inpTomato').getValue();
							var oUnit = sap.ui.getCore().byId('id_unitTomato').getSelectedItem().mProperties.text;

							var oDate = new Date();
							oDate = oDate.toDateString();
							$.ajax({
								url: "https://script.google.com/macros/s/AKfycbyGHG6CJxLbg2vvXY3R3N8wGppxykVK6cLcdFgO3biVuSWh-Kc/exec?category=Vegetable&name=Tomato&qty=" +
									oQuantity + "&unit=" + oUnit + "&daysold=" + oDate +
									"&id=1V31iqLrZjtAakX-FztCBh2XWbWTACAdHwr_ohjH8NIY",
								type: "POST",
							});

						} else {
							var oName2 = "Tomato";
							var oName3 = "tomato";
							$.ajax({
								url: "https://script.google.com/macros/s/AKfycbyGHG6CJxLbg2vvXY3R3N8wGppxykVK6cLcdFgO3biVuSWh-Kc/exec?name=" + oName2 +
									"&id=1V31iqLrZjtAakX-FztCBh2XWbWTACAdHwr_ohjH8NIY",
								type: "GET",
							});
							$.ajax({
								url: "https://script.google.com/macros/s/AKfycbyGHG6CJxLbg2vvXY3R3N8wGppxykVK6cLcdFgO3biVuSWh-Kc/exec?name=" + oName3 +
									"&id=1V31iqLrZjtAakX-FztCBh2XWbWTACAdHwr_ohjH8NIY",
								type: "GET",
							});
							
						}
						jQuery.sap.delayedCall(1000, this , function () {
							oBusyDialog.close();
							that.oDialogTomato.close();
							sap.ui.getCore().byId('id_inpTomato').setValue(' ');
							sap.ui.getCore().byId('id_unitTomato').setSelectedKey(51);
						});
						
						sap.ui.getCore().byId('idview22--id_SyncMaster').addStyleClass('clSyncButton');
						sap.ui.getCore().byId('idview33--id_SyncCheckL').addStyleClass('clSyncButton');
					}
				}),
				endButton: new sap.m.Button({
					text: 'Cancel',
					type: "Reject",
					press: function() {
						that.oDialogTomato.close();
						sap.ui.getCore().byId('id_inpTomato').setValue(' ');
						sap.ui.getCore().byId('id_unitTomato').setSelectedKey(51);
					}
				})

			});

		}
		that.oDialogTomato.open();
	},
	
	onEggs: function() {

		var that = this;
		if (!that.oDialogEggs) {
			that.oDialogEggs = new sap.m.Dialog({
				title: "Item: Eggs",
				stretch: true,
				content: [new sap.m.VBox({
					alignItems: "Center",
					justifyContent: "SpaceAround",
					items: [
						new sap.m.Image({
							src: "images/eggsLarge.jpg"
						}),

						new sap.m.Select({
							id: "id_select_actionEggs",
							width: '12em',
							items: [new sap.ui.core.Item({
									key: 51,
									text: "Add"
								}),
								new sap.ui.core.Item({
									key: 52,
									text: "Remove"
								})
							],
							change: function(oEvent) {
								if (oEvent.getSource().mProperties.selectedKey == "52") {
									sap.ui.getCore().byId('id_inpEggs').setVisible(false);
									sap.ui.getCore().byId('id_unitEggs').setVisible(false);
									sap.ui.getCore().byId('id_lbEggs1').setVisible(false);
									sap.ui.getCore().byId('id_lbEggs2').setVisible(false);
								} else {
									sap.ui.getCore().byId('id_inpEggs').setVisible(true);
									sap.ui.getCore().byId('id_unitEggs').setVisible(true);
									sap.ui.getCore().byId('id_lbEggs1').setVisible(true);
									sap.ui.getCore().byId('id_lbEggs2').setVisible(true);
								}
							}
						}),
						new sap.m.Label({id: "id_lbEggs1", text: "Type quantity"}),
						new sap.m.Input({
							id: "id_inpEggs",
							width: '12em',
							type: sap.m.InputType.Number
						}),
						new sap.m.Label({id: "id_lbEggs2", text: "Select unit"}),
						new sap.m.Select({
							id: "id_unitEggs",
							width: '12em',
							items: [
								new sap.ui.core.Item({
									key: 51,
									text: " "
								}),
								new sap.ui.core.Item({
									key: 5,
									text: "dozen"
								}),
								new sap.ui.core.Item({
									key: 57,
									text: "pc"
								})
							]
						})

					]
				})],
				beginButton: new sap.m.Button({
					text: 'Proceed',
					type: "Emphasized",
					press: function() {
						var oBusyDialog = new sap.m.BusyDialog({text:"Processing..."});
						oBusyDialog.open();
						if (sap.ui.getCore().byId('id_select_actionEggs').getSelectedKey() == "51") {
							var oQuantity = sap.ui.getCore().byId('id_inpEggs').getValue();
							var oUnit = sap.ui.getCore().byId('id_unitEggs').getSelectedItem().mProperties.text;

							var oDate = new Date();
							oDate = oDate.toDateString();
							$.ajax({
								url: "https://script.google.com/macros/s/AKfycbyGHG6CJxLbg2vvXY3R3N8wGppxykVK6cLcdFgO3biVuSWh-Kc/exec?category=Dairy&name=Eggs&qty=" +
									oQuantity + "&unit=" + oUnit + "&daysold=" + oDate +
									"&id=1V31iqLrZjtAakX-FztCBh2XWbWTACAdHwr_ohjH8NIY",
								type: "POST",
							});

						} else {
							var oName2 = "Eggs";
							var oName3 = "eggs";
							$.ajax({
								url: "https://script.google.com/macros/s/AKfycbyGHG6CJxLbg2vvXY3R3N8wGppxykVK6cLcdFgO3biVuSWh-Kc/exec?name=" + oName2 +
									"&id=1V31iqLrZjtAakX-FztCBh2XWbWTACAdHwr_ohjH8NIY",
								type: "GET",
							});
							$.ajax({
								url: "https://script.google.com/macros/s/AKfycbyGHG6CJxLbg2vvXY3R3N8wGppxykVK6cLcdFgO3biVuSWh-Kc/exec?name=" + oName3 +
									"&id=1V31iqLrZjtAakX-FztCBh2XWbWTACAdHwr_ohjH8NIY",
								type: "GET",
							});
							
						}
						jQuery.sap.delayedCall(1000, this , function () {
							oBusyDialog.close();
							that.oDialogEggs.close();
							sap.ui.getCore().byId('id_inpEggs').setValue(' ');
							sap.ui.getCore().byId('id_unitEggs').setSelectedKey(51);
						});
						
						sap.ui.getCore().byId('idview22--id_SyncMaster').addStyleClass('clSyncButton');
						sap.ui.getCore().byId('idview33--id_SyncCheckL').addStyleClass('clSyncButton');
					}
				}),
				endButton: new sap.m.Button({
					text: 'Cancel',
					type: "Reject",
					press: function() {
						that.oDialogEggs.close();
						sap.ui.getCore().byId('id_inpEggs').setValue(' ');
						sap.ui.getCore().byId('id_unitEggs').setSelectedKey(51);
					}
				})

			});

		}
		that.oDialogEggs.open();
	},
	onCurd: function() {

		var that = this;
		if (!that.oDialogCurd) {
			that.oDialogCurd = new sap.m.Dialog({
				title: "Item: Curd",
				stretch: true,
				content: [new sap.m.VBox({
					alignItems: "Center",
					justifyContent: "SpaceAround",
					items: [
						new sap.m.Image({
							src: "images/curdLarge.jpg"
						}),

						new sap.m.Select({
							id: "id_select_actionCurd",
							width: '12em',
							items: [new sap.ui.core.Item({
									key: 51,
									text: "Add"
								}),
								new sap.ui.core.Item({
									key: 52,
									text: "Remove"
								})
							],
							change: function(oEvent) {
								if (oEvent.getSource().mProperties.selectedKey == "52") {
									sap.ui.getCore().byId('id_inpCurd').setVisible(false);
									sap.ui.getCore().byId('id_unitCurd').setVisible(false);
									sap.ui.getCore().byId('id_lbCurd1').setVisible(false);
									sap.ui.getCore().byId('id_lbCurd2').setVisible(false);
								} else {
									sap.ui.getCore().byId('id_inpCurd').setVisible(true);
									sap.ui.getCore().byId('id_unitCurd').setVisible(true);
									sap.ui.getCore().byId('id_lbCurd1').setVisible(true);
									sap.ui.getCore().byId('id_lbCurd2').setVisible(true);
								}
							}
						}),
						new sap.m.Label({id: "id_lbCurd1", text: "Type quantity"}),
						new sap.m.Input({
							id: "id_inpCurd",
							width: '12em',
							type: sap.m.InputType.Number
						}),
						new sap.m.Label({id: "id_lbCurd2", text: "Select unit"}),
						new sap.m.Select({
							id: "id_unitCurd",
							width: '12em',
							items: [
								new sap.ui.core.Item({
									key: 51,
									text: " "
								}),
								new sap.ui.core.Item({
									key: 5,
									text: "packet"
								}),
								new sap.ui.core.Item({
									key: 57,
									text: "bowl"
								})
							]
						})

					]
				})],
				beginButton: new sap.m.Button({
					text: 'Proceed',
					type: "Emphasized",
					press: function() {
						var oBusyDialog = new sap.m.BusyDialog({text:"Processing..."});
						oBusyDialog.open();
						if (sap.ui.getCore().byId('id_select_actionCurd').getSelectedKey() == "51") {
							var oQuantity = sap.ui.getCore().byId('id_inpCurd').getValue();
							var oUnit = sap.ui.getCore().byId('id_unitCurd').getSelectedItem().mProperties.text;

							var oDate = new Date();
							oDate = oDate.toDateString();
							$.ajax({
								url: "https://script.google.com/macros/s/AKfycbyGHG6CJxLbg2vvXY3R3N8wGppxykVK6cLcdFgO3biVuSWh-Kc/exec?category=Dairy&name=Curd&qty=" +
									oQuantity + "&unit=" + oUnit + "&daysold=" + oDate +
									"&id=1V31iqLrZjtAakX-FztCBh2XWbWTACAdHwr_ohjH8NIY",
								type: "POST",
							});

						} else {
							var oName2 = "Curd";
							var oName3 = "curd";
							$.ajax({
								url: "https://script.google.com/macros/s/AKfycbyGHG6CJxLbg2vvXY3R3N8wGppxykVK6cLcdFgO3biVuSWh-Kc/exec?name=" + oName2 +
									"&id=1V31iqLrZjtAakX-FztCBh2XWbWTACAdHwr_ohjH8NIY",
								type: "GET",
							});
							$.ajax({
								url: "https://script.google.com/macros/s/AKfycbyGHG6CJxLbg2vvXY3R3N8wGppxykVK6cLcdFgO3biVuSWh-Kc/exec?name=" + oName3 +
									"&id=1V31iqLrZjtAakX-FztCBh2XWbWTACAdHwr_ohjH8NIY",
								type: "GET",
							});
							
						}
						jQuery.sap.delayedCall(1000, this , function () {
							oBusyDialog.close();
							that.oDialogCurd.close();
							sap.ui.getCore().byId('id_inpCurd').setValue(' ');
							sap.ui.getCore().byId('id_unitCurd').setSelectedKey(51);
						});
						
						sap.ui.getCore().byId('idview22--id_SyncMaster').addStyleClass('clSyncButton');
						sap.ui.getCore().byId('idview33--id_SyncCheckL').addStyleClass('clSyncButton');

					}
				}),
				endButton: new sap.m.Button({
					text: 'Cancel',
					type: "Reject",
					press: function() {
						that.oDialogCurd.close();
						sap.ui.getCore().byId('id_inpCurd').setValue(' ');
						sap.ui.getCore().byId('id_unitCurd').setSelectedKey(51);
					}
				})

			});

		}
		that.oDialogCurd.open();
	},
	onLemon: function() {

		var that = this;
		if (!that.oDialogLemon) {
			that.oDialogLemon = new sap.m.Dialog({
				title: "Item: Lemon",
				stretch: true,
				content: [new sap.m.VBox({
					alignItems: "Center",
					justifyContent: "SpaceAround",
					items: [
						new sap.m.Image({
							src: "images/lemonLarge.jpg"
						}),

						new sap.m.Select({
							id: "id_select_actionLemon",
							width: '12em',
							items: [new sap.ui.core.Item({
									key: 51,
									text: "Add"
								}),
								new sap.ui.core.Item({
									key: 52,
									text: "Remove"
								})
							],
							change: function(oEvent) {
								if (oEvent.getSource().mProperties.selectedKey == "52") {
									sap.ui.getCore().byId('id_inpLemon').setVisible(false);
									sap.ui.getCore().byId('id_unitLemon').setVisible(false);
									sap.ui.getCore().byId('id_lbLemon1').setVisible(false);
									sap.ui.getCore().byId('id_lbLemon2').setVisible(false);
								} else {
									sap.ui.getCore().byId('id_inpLemon').setVisible(true);
									sap.ui.getCore().byId('id_unitLemon').setVisible(true);
									sap.ui.getCore().byId('id_lbLemon1').setVisible(true);
									sap.ui.getCore().byId('id_lbLemon2').setVisible(true);
								}
							}
						}),
						new sap.m.Label({id: "id_lbLemon1", text: "Type quantity"}),
						new sap.m.Input({
							id: "id_inpLemon",
							width: '12em',
							type: sap.m.InputType.Number
						}),
						new sap.m.Label({id: "id_lbLemon2", text: "Select unit"}),
						new sap.m.Select({
							id: "id_unitLemon",
							width: '12em',
							items: [
								new sap.ui.core.Item({
									key: 51,
									text: " "
								}),
								new sap.ui.core.Item({
									key: 5,
									text: "pc"
								}),
								new sap.ui.core.Item({
									key: 57,
									text: "gm"
								})
							]
						})

					]
				})],
				beginButton: new sap.m.Button({
					text: 'Proceed',
					type: "Emphasized",
					press: function() {
						var oBusyDialog = new sap.m.BusyDialog({text:"Processing..."});
						oBusyDialog.open();
						if (sap.ui.getCore().byId('id_select_actionLemon').getSelectedKey() == "51") {
							var oQuantity = sap.ui.getCore().byId('id_inpLemon').getValue();
							var oUnit = sap.ui.getCore().byId('id_unitLemon').getSelectedItem().mProperties.text;

							var oDate = new Date();
							oDate = oDate.toDateString();
							$.ajax({
								url: "https://script.google.com/macros/s/AKfycbyGHG6CJxLbg2vvXY3R3N8wGppxykVK6cLcdFgO3biVuSWh-Kc/exec?category=Fruit&name=Lemon&qty=" +
									oQuantity + "&unit=" + oUnit + "&daysold=" + oDate +
									"&id=1V31iqLrZjtAakX-FztCBh2XWbWTACAdHwr_ohjH8NIY",
								type: "POST",
							});

						} else {
							var oName2 = "Lemon";
							var oName3 = "lemon";
							$.ajax({
								url: "https://script.google.com/macros/s/AKfycbyGHG6CJxLbg2vvXY3R3N8wGppxykVK6cLcdFgO3biVuSWh-Kc/exec?name=" + oName2 +
									"&id=1V31iqLrZjtAakX-FztCBh2XWbWTACAdHwr_ohjH8NIY",
								type: "GET",
							});
							$.ajax({
								url: "https://script.google.com/macros/s/AKfycbyGHG6CJxLbg2vvXY3R3N8wGppxykVK6cLcdFgO3biVuSWh-Kc/exec?name=" + oName3 +
									"&id=1V31iqLrZjtAakX-FztCBh2XWbWTACAdHwr_ohjH8NIY",
								type: "GET",
							});
						}
						jQuery.sap.delayedCall(1000, this , function () {
							oBusyDialog.close();
							that.oDialogLemon.close();
							sap.ui.getCore().byId('id_inpLemon').setValue(' ');
							sap.ui.getCore().byId('id_unitLemon').setSelectedKey(51);
						});
						
						sap.ui.getCore().byId('idview22--id_SyncMaster').addStyleClass('clSyncButton');
						sap.ui.getCore().byId('idview33--id_SyncCheckL').addStyleClass('clSyncButton');

					}
				}),
				endButton: new sap.m.Button({
					text: 'Cancel',
					type: "Reject",
					press: function() {
						that.oDialogLemon.close();
						sap.ui.getCore().byId('id_inpLemon').setValue(' ');
						sap.ui.getCore().byId('id_unitLemon').setSelectedKey(51);
					}
				})

			});

		}
		that.oDialogLemon.open();
	},
	cautionYellow: function(){
		
		var that = this;
		if (!that.oDialogYellow) {
			that.oDialogYellow = new sap.m.Dialog({
				title: "Gentle Reminder!",
				type: 'Message',
				state: 'Warning',
				content: new sap.m.Text({text: "Some items are more than 4 days old"}),
				beginButton: new sap.m.Button({
					text: 'OK',
					press: function () {
						that.oDialogYellow.close();
					}
				}),
				afterClose: function() {
						that.oDialogYellow.destroy();
				}
			});
			
			that.oDialogYellow.open();
		}			
				
		
		this.getView().byId("id_ButtonYellow").setVisible(false);
		if((this.getView().byId("id_ButtonRed").getVisible() == false) && (this.getView().byId("id_ButtonChecklist").getVisible() == false))
			{
				this.getView().byId("idPageHome").destroyFooter();
					
			}
		
	},
	
	
	cautionRed: function(){
		
		var that = this;
		if (!that.oDialogRed) {
			that.oDialogRed = new sap.m.Dialog({
				title: "Please Act Immediately!!",
				type: 'Message',
				state: 'Error',
				content: new sap.m.Text({text: "Some items are more than 7 days old"}),
				beginButton: new sap.m.Button({
					text: 'OK',
					press: function () {
						that.oDialogRed.close();
					}
				}),
				afterClose: function() {
						that.oDialogRed.destroy();
				}
			});
			
			that.oDialogRed.open();
		}	
		
		this.getView().byId("id_ButtonRed").setVisible(false);
		if((this.getView().byId("id_ButtonYellow").getVisible() == false) && (this.getView().byId("id_ButtonChecklist").getVisible() == false))
			{
				this.getView().byId("idPageHome").destroyFooter();
					
			}		
		},
		
		cautionCheck: function(){
			
			var that = this;
			if (!that.oDialogCheckL) {
				that.oDialogCheckL = new sap.m.Dialog({
					title: "Notification",
					type: 'Message',
					state: 'Warning',
					content: new sap.m.Text({text: "Necessary Items - out of stock !! Please open Checklist !!"}),
					beginButton: new sap.m.Button({
						text: 'OK',
						press: function () {
							that.oDialogCheckL.close();
						}
					}),
					afterClose: function() {
							that.oDialogCheckL.destroy();
					}
				});
				
				that.oDialogCheckL.open();
			}			
					
			this.getView().byId("id_ButtonChecklist").setVisible(false);
			if((this.getView().byId("id_ButtonRed").getVisible() == false) && (this.getView().byId("id_ButtonYellow").getVisible() == false))
				{
					this.getView().byId("idPageHome").destroyFooter();
						
				}
			
		},
		
		onChecklist: function(){
			
			if(this.getView().byId("id_ButtonChecklist") != undefined)
				{
					this.getView().byId("id_ButtonChecklist").setVisible(false);
				}
			app.to(pageCheckList);
			
		},
		
		onMessages: function(){
			
			app.to(pageMessage);
			
		}
	
	});