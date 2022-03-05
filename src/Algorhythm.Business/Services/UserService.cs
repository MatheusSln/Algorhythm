using Algorhythm.Business.Interfaces;
using Algorhythm.Business.Models;
using Algorhythm.Business.Models.Validations;
using System;
using System.Threading.Tasks;

namespace Algorhythm.Business.Services
{
    public class UserService : BaseService, IUserService
    {
        public readonly IUserRepository _userRepository;

        public UserService(IUserRepository userRepository, INotifier notifier) : 
            base(notifier)
        {
            _userRepository = userRepository;
        }

        public async Task Add(User user)
        {
            if (!ExecuteValidation(new UserValidation(), user))
                return;

            await _userRepository.Add(user);
        }

        public async Task Update(User user)
        {
            if (!ExecuteValidation(new UserValidation(), user))
                return;

            await _userRepository.Update(user);
        }

        public async Task Remove(Guid id)
        {
            await _userRepository.Remove(id);
        }

        public void Dispose()
        {
            _userRepository?.Dispose();
        }
    }
}
