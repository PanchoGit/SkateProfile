using System.Web.Mvc;
using ApplicationService;

using AppWeb.Models;

using ServiceInterface;

namespace AppWeb.Controllers
{
    public class SpawnController : Controller
    {
        private readonly ISkateService service;

        public SpawnController()
        {
            service = new SkateService(new SkateSvcData());
        }

        // GET: /Spawn/
        public ActionResult Index()
        {
            var skates = service.GetAll();

            return View(new SkateModel{ Skaters = skates });
        }
    }
}
