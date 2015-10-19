using System.Collections.Generic;

using DataModel;

namespace BuggyWeb.Models
{
    public class SkateModel
    {
        public IEnumerable<SkateEntity> Skaters { get; set; }
    }
}