using Algorhythm.Business.Notifications;
using System.Collections.Generic;

namespace Algorhythm.Business.Interfaces
{
    public interface INotifier
    {
        bool HasNotification();
        List<Notification> GetNotifications();
        void Handle(Notification notification);
    }
}
