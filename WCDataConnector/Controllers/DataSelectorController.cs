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
        //Test /DataSelector/Top10Destination
        public IActionResult Top10Destination()
        {
            var webClient = new WebClient();
            var json = webClient.DownloadString(@"https://gettopservices.azurewebsites.net/api/v1/GetTop10Destinations");
            var data = JsonConvert.DeserializeObject<List < List <string>>> (json);

            List<Top10Destination> list = new List<Top10Destination>();

            for(int i = 0; i < data.Count; i++)
            {
                list.Add(new Top10Destination(data[i][0], data[i][1]));
            }

            return View(list);
        }

        public IActionResult Top10Destinations2()
        {
            return View();
        }

        public IActionResult Top10Sources2()
        {
            return View();
        }

        public IActionResult Top10ImageSources()
        {
            return View();
        }


        public IActionResult Top10Source()
        {
            var webClient = new WebClient();
            var json = webClient.DownloadString(@"https://gettopservices.azurewebsites.net/api/v1/GetTop10Sources");
            var data = JsonConvert.DeserializeObject<List<List<string>>>(json);

            List<Top10Destination> list = new List<Top10Destination>();

            for (int i = 0; i < data.Count; i++)
            {
                list.Add(new Top10Destination(data[i][0], data[i][1]));
            }

            return View(list);
        }
    }
}