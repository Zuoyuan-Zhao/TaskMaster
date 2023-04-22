namespace TaskMaster_Api.Models
{
    public class TaskLog
    {
        public int Id { get; set; }
        public int TaskId { get; set; }
        public string ModifiedBy { get; set; }
        public DateTime ModifiedDate { get; set; }
        public string OldValue { get; set; }
        public string NewValue { get; set; }
        public ActionType ActionType { get; set; }
    }

    public enum ActionType
    {
        Creation,
        Modification,
        Deletion
    }
}
