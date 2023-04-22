using Microsoft.AspNetCore.Mvc;
using TaskMaster_Api.Models;

namespace TaskMaster_Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TaskController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
        "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
    };

        private readonly ILogger<TaskController> _logger;

        public TaskController(ILogger<TaskController> logger)
        {
            _logger = logger;
        }

        [HttpGet(Name = "GetTasks")]
        public IEnumerable<TaskEntry> Get()
        {
            return Enumerable.Range(1, 5).Select(index => new TaskEntry
            {
            })
            .ToArray();
        }
    }
}