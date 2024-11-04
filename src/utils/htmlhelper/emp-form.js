export const empForm = `<form id="createEmpForm">
<div class="emp-group">
    <label for="name">Name</label>
    <input type="text" id="name" name="name" minlength="5" required>
</div>

<div class="emp-group">
    <label for="sex">Sex</label>
    <input type="radio" name="sex" id="female" value="Female">
    <label for="female">Female</label>
    <input type="radio" name="sex" id="male" value="Male">
    <label for="male">Male</label>
</div>

<div class="emp-group">
    <label for="department">Department</label>
    <select id="department" name="department" required>
        <option value="">Select Department</option>
        <option value="HR">HR</option>
        <option value="Finance">Finance</option>
        <option value="IT">IT</option>
    </select>

    <div class="emp-group">
        <label for="employeeType">Employee Type</label>
        <select id="employeeType" name="employeeType" required>
            <option value="">Select Employee Type</option>
            <option value="Regular">Regular</option>
            <option value="Probation">Probation</option>
        </select>
    </div>

    <div class="emp-group">
        <label for="role">Role</label>
        <input type="text" id="role" name="role" required>
    </div>

      <div class="emp-group">
        <label for="bacisSalary">Basic Salary</label>
        <input type="number" id="basicSalary" name="basicSalary" required>
    </div>

    <div class="emp-group">
        <label for="dayOff">Day Off</label>
        <select id="dayOff" name="dayOff" required>
            <option value="">Select Day Off</option>
            <option value="Saturday&Sunday">Saturday&Sunday</option>
            <option value="Sunday">Sunday</option>
        </select>                        
    </div>


    <input type="submit" id="saveEmp" class="btn btn-primary" value="Submit">
</div>
</form>`;

export const updateEmpDetailsForm = (empDetails) => {
  const modalBody = document.querySelector("#updateModal .modal-body");
  modalBody.innerHTML = `
  <form id="updateEmpForm">
<div class="emp-group">
    <label for="name">Name</label>
    <input type="text" id="name" name="name" value="${
      empDetails.name
    }" minlength="5" required>
</div>

<div class="emp-group">
    <label for="sex">Sex</label>
    <input type="radio" name="sex" id="female" value="Female" ${
      empDetails.sex === "Female" ? "checked" : ""
    }>
    <label for="female">Female</label>
    <input type="radio" name="sex" id="male" value="Male" ${
      empDetails.sex === "Male" ? "checked" : ""
    }>
    <label for="male">Male</label>
</div>

<div class="emp-group">
    <label for="department">Department</label>
    <select id="department" name="department" required>
        <option value="">Select Department</option>
        <option value="HR" ${
          empDetails.department === "HR" ? "selected" : ""
        }>HR</option>
        <option value="Finance" ${
          empDetails.department === "Finance" ? "selected" : ""
        }>Finance</option>
        <option value="IT" ${
          empDetails.department === "IT" ? "selected" : ""
        }>IT</option>
    </select>

    <div class="emp-group">
        <label for="employeeType">Employee Type</label>
        <select id="employeeType" name="employeeType" required>
            <option value="">Select Employee Type</option>
            <option value="Regular" ${
              empDetails.employeeType === "Regular" ? "selected" : ""
            }>Regular</option>
            <option value="Probation" ${
              empDetails.employeeType === "Probation" ? "selected" : ""
            }>Probation</option>
        </select>
    </div>

    <div class="emp-group">
        <label for="role">Role</label>
        <input type="text" id="role" name="role" value="${
          empDetails.role
        }" required>
    </div>

      <div class="emp-group">
        <label for="bacisSalary">Basic Salary</label>
        <input type="number" id="basicSalary" name="basicSalary" value="${
          empDetails.basicSalary
        }" required>
    </div>

    <div class="emp-group">
        <label for="dayOff">Day Off</label>
        <select id="dayOff" name="dayOff" required>
            <option value="">Select Day Off</option>
            <option value="Saturday&Sunday" ${
              empDetails.dayOff === "Saturday&Sunday" ? "selected" : ""
            }>Saturday&Sunday</option>
            <option value="Sunday"  ${
              empDetails.dayOff === "Sunday" ? "selected" : ""
            }>Sunday</option>
        </select>                        
    </div>

   
    <div class="emp-group">
        <label for="isResignTrue">Resign: </label>
        <input type="radio" name="isResign" id="isResignTrue" value="true" ${
          empDetails.isResign ? "checked" : ""
        }>
        <label for="isResignFalse">True</label>
        <input type="radio" name="isResign" id="isResignFalse" value="false" ${
          !empDetails.isResign ? "checked" : ""
        }>
        <label for="isResign">False</label>
    </div>

    <div class="emp-group" ${isResign ? 'style="display: none"' : ""}>
        <label for ="resignDate">Resign Date:</label>
        <input type="date" id="resignDate" name="resignDate" value="${
          empDetails.isResign
            ? new Date(empDetails.resignDate).toISOString().split("T")[0]
            : ""
        }">
    </div>

</div>
</form>`;
};
