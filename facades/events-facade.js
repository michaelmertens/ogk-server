"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const Log4js = require("log4js");
const logger = Log4js.getLogger('[ogk] [events facade]');
const router = express.Router();
class EventsFacade {
    static getEvents(req, res) {
        let id = req.params.id;
        res.send({
            _embedded: {
                events: EventsFacade._events
            }
        });
    }
}
EventsFacade.router = router;
EventsFacade._events = [
    {
        date: new Date(),
        owner: "Tom Meyns",
        createdBy: "Tom Meyns",
        title: "Container",
        description: "Iedereen meer dan welkom om mee nen container te komen vullen. Pintjes staan koud!",
        isAnonymous: false
    },
    {
        date: new Date(),
        owner: "Karel Mangeleer",
        createdBy: "Karel Mangeleer",
        title: "Tear down that wall",
        description: "Iedereen meer dan welkom om mee ne muur te komen slopen. Pintjes staan koud!",
        isAnonymous: false
    },
    {
        date: new Date(),
        owner: "Michael Mertens",
        createdBy: "Michael Mertens",
        title: "Vlaanderen zingt",
        description: "Iedereen meer dan welkom om mee te komen zingen en eventueel een handje te helpen. Pintjes staan koud!",
        isAnonymous: false
    }
];
exports.EventsFacade = EventsFacade;
// router config
router.get('/', EventsFacade.getEvents);

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZhY2FkZXMvZXZlbnRzLWZhY2FkZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLG1DQUFtQztBQUVuQyxpQ0FBaUM7QUFJakMsTUFBTSxNQUFNLEdBQVcsTUFBTSxDQUFDLFNBQVMsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO0FBQ2pFLE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUVoQztJQTZCSSxNQUFNLENBQUMsU0FBUyxDQUFDLEdBQVksRUFBRSxHQUFhO1FBQ3hDLElBQUksRUFBRSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDO1FBRXZCLEdBQUcsQ0FBQyxJQUFJLENBQUM7WUFDTCxTQUFTLEVBQUU7Z0JBQ1AsTUFBTSxFQUFFLFlBQVksQ0FBQyxPQUFPO2FBQy9CO1NBQ0osQ0FBQyxDQUFDO0lBQ1AsQ0FBQzs7QUFwQ00sbUJBQU0sR0FBRyxNQUFNLENBQUM7QUFDaEIsb0JBQU8sR0FBZ0I7SUFDMUI7UUFDSSxJQUFJLEVBQUUsSUFBSSxJQUFJLEVBQUU7UUFDaEIsS0FBSyxFQUFFLFdBQVc7UUFDbEIsU0FBUyxFQUFFLFdBQVc7UUFDdEIsS0FBSyxFQUFFLFdBQVc7UUFDbEIsV0FBVyxFQUFFLG9GQUFvRjtRQUNqRyxXQUFXLEVBQUUsS0FBSztLQUNyQjtJQUNEO1FBQ0ksSUFBSSxFQUFFLElBQUksSUFBSSxFQUFFO1FBQ2hCLEtBQUssRUFBRSxpQkFBaUI7UUFDeEIsU0FBUyxFQUFFLGlCQUFpQjtRQUM1QixLQUFLLEVBQUUscUJBQXFCO1FBQzVCLFdBQVcsRUFBRSw4RUFBOEU7UUFDM0YsV0FBVyxFQUFFLEtBQUs7S0FDckI7SUFDRDtRQUNJLElBQUksRUFBRSxJQUFJLElBQUksRUFBRTtRQUNoQixLQUFLLEVBQUUsaUJBQWlCO1FBQ3hCLFNBQVMsRUFBRSxpQkFBaUI7UUFDNUIsS0FBSyxFQUFFLGtCQUFrQjtRQUN6QixXQUFXLEVBQUUsd0dBQXdHO1FBQ3JILFdBQVcsRUFBRSxLQUFLO0tBQ3JCO0NBQ0osQ0FBQztBQTNCTixvQ0FzQ0M7QUFFRCxnQkFBZ0I7QUFDaEIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsWUFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDIiwiZmlsZSI6ImZhY2FkZXMvZXZlbnRzLWZhY2FkZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7UmVxdWVzdCwgUmVzcG9uc2V9IGZyb20gXCJleHByZXNzLXNlcnZlLXN0YXRpYy1jb3JlXCI7XHJcbmltcG9ydCAqIGFzIGV4cHJlc3MgZnJvbSBcImV4cHJlc3NcIjtcclxuaW1wb3J0ICogYXMgYXV0aFNlcnZpY2UgZnJvbSAnLi4vc2VydmljZXMvYXV0aC1zZXJ2aWNlJztcclxuaW1wb3J0ICogYXMgTG9nNGpzIGZyb20gJ2xvZzRqcyc7XHJcbmltcG9ydCB7aGFuZGxlRXJyb3JzfSBmcm9tIFwiLi4vc2VydmljZXMvZXJyb3Itc2VydmljZVwiO1xyXG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwibG9nNGpzXCI7XHJcbmltcG9ydCB7IE9na0V2ZW50IH0gZnJvbSBcIi4uL3NoYXJlZC9jb250cmFjdHMvZXZlbnQtY29udHJhY3RcIjtcclxuY29uc3QgbG9nZ2VyOiBMb2dnZXIgPSBMb2c0anMuZ2V0TG9nZ2VyKCdbb2drXSBbZXZlbnRzIGZhY2FkZV0nKTtcclxuY29uc3Qgcm91dGVyID0gZXhwcmVzcy5Sb3V0ZXIoKTsgXHJcblxyXG5leHBvcnQgY2xhc3MgRXZlbnRzRmFjYWRlIHtcclxuICAgIHN0YXRpYyByb3V0ZXIgPSByb3V0ZXI7XHJcbiAgICBzdGF0aWMgX2V2ZW50czogT2drRXZlbnRbXSA9ICBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBkYXRlOiBuZXcgRGF0ZSgpLFxyXG4gICAgICAgICAgICBvd25lcjogXCJUb20gTWV5bnNcIixcclxuICAgICAgICAgICAgY3JlYXRlZEJ5OiBcIlRvbSBNZXluc1wiLFxyXG4gICAgICAgICAgICB0aXRsZTogXCJDb250YWluZXJcIixcclxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiSWVkZXJlZW4gbWVlciBkYW4gd2Vsa29tIG9tIG1lZSBuZW4gY29udGFpbmVyIHRlIGtvbWVuIHZ1bGxlbi4gUGludGplcyBzdGFhbiBrb3VkIVwiLFxyXG4gICAgICAgICAgICBpc0Fub255bW91czogZmFsc2VcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZGF0ZTogbmV3IERhdGUoKSxcclxuICAgICAgICAgICAgb3duZXI6IFwiS2FyZWwgTWFuZ2VsZWVyXCIsXHJcbiAgICAgICAgICAgIGNyZWF0ZWRCeTogXCJLYXJlbCBNYW5nZWxlZXJcIixcclxuICAgICAgICAgICAgdGl0bGU6IFwiVGVhciBkb3duIHRoYXQgd2FsbFwiLFxyXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJJZWRlcmVlbiBtZWVyIGRhbiB3ZWxrb20gb20gbWVlIG5lIG11dXIgdGUga29tZW4gc2xvcGVuLiBQaW50amVzIHN0YWFuIGtvdWQhXCIsXHJcbiAgICAgICAgICAgIGlzQW5vbnltb3VzOiBmYWxzZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBkYXRlOiBuZXcgRGF0ZSgpLFxyXG4gICAgICAgICAgICBvd25lcjogXCJNaWNoYWVsIE1lcnRlbnNcIixcclxuICAgICAgICAgICAgY3JlYXRlZEJ5OiBcIk1pY2hhZWwgTWVydGVuc1wiLFxyXG4gICAgICAgICAgICB0aXRsZTogXCJWbGFhbmRlcmVuIHppbmd0XCIsXHJcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkllZGVyZWVuIG1lZXIgZGFuIHdlbGtvbSBvbSBtZWUgdGUga29tZW4gemluZ2VuIGVuIGV2ZW50dWVlbCBlZW4gaGFuZGplIHRlIGhlbHBlbi4gUGludGplcyBzdGFhbiBrb3VkIVwiLFxyXG4gICAgICAgICAgICBpc0Fub255bW91czogZmFsc2VcclxuICAgICAgICB9XHJcbiAgICBdO1xyXG5cclxuICAgIHN0YXRpYyBnZXRFdmVudHMocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlKSB7XHJcbiAgICAgICAgbGV0IGlkID0gcmVxLnBhcmFtcy5pZDtcclxuXHJcbiAgICAgICAgcmVzLnNlbmQoe1xyXG4gICAgICAgICAgICBfZW1iZWRkZWQ6IHtcclxuICAgICAgICAgICAgICAgIGV2ZW50czogRXZlbnRzRmFjYWRlLl9ldmVudHNcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcblxyXG4vLyByb3V0ZXIgY29uZmlnXHJcbnJvdXRlci5nZXQoJy8nLCBFdmVudHNGYWNhZGUuZ2V0RXZlbnRzKTsiXSwic291cmNlUm9vdCI6Ii4uIn0=
