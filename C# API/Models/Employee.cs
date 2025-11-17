namespace EmployeeListApp.Models;

    public class Employee
    {

        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Department { get; set; }
        public string Position { get; set; }
        public decimal salary { get; set; }
        public DateTime? DateEmployed { get; set; }

    }

