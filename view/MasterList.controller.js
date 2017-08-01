sap.ui.controller("view.MasterList", {
	

		onInit: function(){
			
			var sUrl = "https://spreadsheets.google.com/feeds/list/1V31iqLrZjtAakX-FztCBh2XWbWTACAdHwr_ohjH8NIY/od6/public/values?alt=json";
			var oJsonModel = new sap.ui.model.json.JSONModel();
			var that = this;
			 $.getJSON(sUrl, function(data){
				 var aData = data.feed.entry;
				 oJsonModel.setData(aData);
				 that.getView().setModel(oJsonModel);
        	});
		},
		
		onBack: function(){
			app.to(page);			
		},
		
		onRefresh: function(){
			
			this.getView().byId('id_SyncMaster').removeStyleClass('clSyncButton');
			
			var oBusyDialog = new sap.m.BusyDialog({text:"Synchronizing..."});
			oBusyDialog.open();
			var sUrl = "https://spreadsheets.google.com/feeds/list/1V31iqLrZjtAakX-FztCBh2XWbWTACAdHwr_ohjH8NIY/od6/public/values?alt=json";
			var oJsonModel = new sap.ui.model.json.JSONModel();
			var that = this;
			 $.getJSON(sUrl, function(data){
				 var aData = data.feed.entry;
				 that.getView().getModel().setData(aData);
        	});
			 
			 jQuery.sap.delayedCall(1000, this , function () {
					oBusyDialog.close();
				});
			
		},
		onListItem: function(oEvent){
			
			var that = this;
			var oTitle = oEvent.getSource().getProperty('title');
//			if (!that.oDialogItem) {
				that.oDialogItem = new sap.m.Dialog({
					content: [new sap.m.VBox({
						alignItems: "Center",
						justifyContent: "SpaceAround",
						items: [
						new sap.m.Title({text:"Item Details", titleStyle: sap.ui.core.TitleLevel.H1}),
						new sap.m.Label({text:"Type of Item"}).addStyleClass('clDialogFontLabel'), new sap.m.Text({text:oEvent.getSource().getProperty('intro')}).addStyleClass('clDialogText'),	
						new sap.m.Label({text:"Name"}).addStyleClass('clDialogFontLabel'), new sap.m.Text({text:oEvent.getSource().getProperty('title')}).addStyleClass('clDialogText'),
						new sap.m.Label({text:"Quantity stored"}).addStyleClass('clDialogFontLabel'), new sap.m.Text({text:oEvent.getSource().getProperty('number') + " " + oEvent.getSource().getProperty('numberUnit')}).addStyleClass('clDialogText'),
						new sap.m.Label({text:"Item stored"}).addStyleClass('clDialogFontLabel'), new sap.m.Text({text:oEvent.getSource().getAggregation('firstStatus').getProperty('text')}).addStyleClass('clDialogText'),
						]})
					],
					beginButton: new sap.m.Button({
						text: 'Item Used',
						type: "Accept",
						press: function () {
							
							sap.ui.getCore().byId('idview33--id_SyncCheckL').addStyleClass('clSyncButton');
							
							var oBusyDialog = new sap.m.BusyDialog({text:"Processing..."});
							oBusyDialog.open();
							
							var oName2 = oTitle;

							$.ajax({
								url: "https://script.google.com/macros/s/AKfycbyGHG6CJxLbg2vvXY3R3N8wGppxykVK6cLcdFgO3biVuSWh-Kc/exec?name=" + oName2 +
									"&id=1V31iqLrZjtAakX-FztCBh2XWbWTACAdHwr_ohjH8NIY",
								type: "GET",
							});
							
							jQuery.sap.delayedCall(1000, this , function () {
								oBusyDialog.close();
								that.oDialogItem.close();
								that.onRefresh();
							});
						
						}
					}),
					
					endButton: new sap.m.Button({
						text: 'Not used',
						type: "Reject",
						press: function() {
							that.oDialogItem.close();
						}
					}),
					afterClose: function() {
						that.oDialogItem.destroy();
				}
				});
				
//			}
			that.oDialogItem.open();
			
		},
		
		daysOld : function(oParam) {
			var oToday = new Date();
			var oMonth = oToday.getMonth();
			oToday = oToday.getDate();
			var newDate;

			var originalDate = parseInt(oParam.slice(8, 10));

			if (originalDate > oToday) {
				if (oMonth === 4 || oMonth === 6 || oMonth === 9 || oMonth === 11) {
					newDate = (30 - originalDate) + oToday;
				} else if (oMonth === 2) {
					newDate = (28 - originalDate) + oToday;
				} else {
					newDate = (31 - originalDate) + oToday;
				}
			} else {
				newDate = oToday - originalDate;
			}
			if (newDate == 0) {
				return "Recently stored";
			}else if (newDate == 1) {
					return "Stored yesterday";
			} else {
					return newDate + " days old";
			}
		}
	});