using Amazon;
using Amazon.DynamoDBv2;
using Amazon.Runtime;
using Microsoft.AspNetCore.Mvc;
using TaskMaster_Api.DaoLayer;
using TaskMaster_Api.Models;

namespace TaskMaster_Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskController : ControllerBase
    {
        private readonly TaskDao _taskDao;

        private readonly ILogger<TaskController> _logger;

        private readonly AmazonDynamoDBClient client;

        public TaskController(ILogger<TaskController> logger)
        {
            var credentials = new BasicAWSCredentials(accessKey, secretKey);
            var region = RegionEndpoint.USEast2; 
            client = new AmazonDynamoDBClient(credentials, region);
            _taskDao = new TaskDao(client);
            _logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TaskEntry>>> GetTasks()
        {
            var tasks = await _taskDao.GetTasksAsync();
            return Ok(tasks);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<TaskEntry>> GetTask(string id)
        {
            var task = await _taskDao.GetTaskAsync(id);

            if (task == null)
            {
                return NotFound();
            }

            return Ok(task);
        }

        [HttpPost]
        public async Task<ActionResult<TaskEntry>> CreateTask(TaskEntry task)
        {
            task.Id = Guid.NewGuid().ToString();
            task.CreatedDate = DateTime.UtcNow;
            task.ModifiedDate = DateTime.UtcNow;
            task.VersionNumber = 1;

            await _taskDao.AddTaskAsync(task);
            return Ok(task);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateTask(string id, TaskEntry task)
        {
            var existingTask = await _taskDao.GetTaskAsync(id);

            if (existingTask == null)
            {
                return NotFound();
            }

            existingTask.Title = task.Title;
            existingTask.Description = task.Description;
            existingTask.DueDate = task.DueDate;
            existingTask.Status = task.Status;
            existingTask.Priority = task.Priority;
            existingTask.ModifiedDate = DateTime.UtcNow;
            existingTask.AssignedTo = task.AssignedTo;
            existingTask.Notes = task.Notes;
            existingTask.Tags = task.Tags;
            existingTask.VersionNumber++;

            await _taskDao.UpdateTaskAsync(existingTask);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteTask(string id)
        {
            var existingTask = await _taskDao.GetTaskAsync(id);

            if (existingTask == null)
            {
                return NotFound();
            }

            await _taskDao.DeleteTaskAsync(id);
            return NoContent();
        }
    }
}
