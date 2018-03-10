using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;

namespace SignalRChatRoom
{
    [HubName("myHub")]
    public class MyHub : Hub
    {

        public void Send(string name, string message)
        {
            Clients.All.addMessage(name, message);
            //Clients.Caller.addMessage(message);
            //Clients.Others.addMessage(message);
        }

        public void IsTyping(string name)
        {
            SayWhoIsTyping(name);
        }

        public void SayWhoIsTyping(string name)
        {
            //IHubContext context = GlobalHost.ConnectionManager.GetHubContext<MyHub>();
            Clients.All.sayWhoIsTyping(name);
        }
    }
}