using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using WCDataConnector.Models;

namespace WCDataConnector.Controllers
{
    public class DataSelectorController : Controller
    {
        public IActionResult Top10Destination()
        {
            var webClient = new WebClient();
            var json = webClient.DownloadString(@"https://gettopservices.azurewebsites.net/api/v1/GetTop10Destinations");
            var data = JsonConvert.DeserializeObject(json);

            return View(data);
        }
    }
}