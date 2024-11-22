import { cleaningDataInstance } from "../datacleaning/clean";
export const empForm = `


<form id="createEmpForm" style="width: 60%; display:none;">
<div class="emp-group row">
    <label for="name" class="col-sm-2 col-form-label">Name</label>
    <div class="col-sm-10">
    <input type="text" pattern="[A-Za-z\s]+"  title="Only letters and spaces allowed"  id="name" class="form-control" name="name" minlength="5" required>
    </div>
</div>

  <div class="emp-group row">
      <label for="sex" class="col-sm-2 col-form-label">Sex</label>
      
      <div class="col-sm-10 d-flex ">
        <div class="form-check form-check-inline d-flex">
          <input class="form-check-input" type="radio" name="sex" id="female" value="Female">
          <label class="form-check-label" for="female">Female</label>
        </div>
      
        <div class="form-check form-check-inline d-flex">
          <input class="form-check-input" type="radio" name="sex" id="male" value="Male">
          <label class="form-check-label" for="male">Male</label>
        </div>
      </div>
  </div>

  <div class="emp-group  row">
    <label for="department" class="col-sm-2 col-form-label">Department</label>
    <div class="col-sm-10">
        <select id="department" name="department" class="col-sm-2 form-control" required>
            <option value="">Select Department</option>
            <option value="HR">HR</option>
            <option value="Finance">Finance</option>
            <option value="IT">IT</option>
        </select>
    </div> 
  </div> 

    <div class="emp-group  row">
        <label for="employeeType" class="col-sm-2 col-form-label">Employee Type</label>
      <div class="col-sm-10">  
        <select id="employeeType" name="employeeType" class="col-sm-2 form-control" required>
            <option value="">Select Employee Type</option>
            <option value="Regular">Regular</option>
            <option value="Probation">Probation</option>
        </select>
      </div>
    </div>

    <div class="emp-group  row">
        <label for="role" class="col-sm-2 col-form-label">Role</label>
         <div class="col-sm-10">
            <input type="text" pattern="[A-Za-z\s]+"  id="role" title="Only letters and spaces allowed"  name="role" class="col-sm-2 form-control" required>
        </div>
    </div>

      <div class="emp-group  row">
        <label for="bacisSalary" class="col-sm-2 col-form-label">Basic Salary</label>
        <div class="col-sm-10">
          <input type="number" id="basicSalary" name="basicSalary" class="col-sm-2 form-control" required>
        </div>
      </div>  

    <div class="emp-group  row">
        <label for="dayOff" class="col-sm-2 col-form-label">Day Off</label>
        <div class="col-sm-10">
          <select id="dayOff" name="dayOff" class="col-sm-2 form-control" required>
              <option value="">Select Day Off</option>
              <option value="Saturday&Sunday">Saturday&Sunday</option>
              <option value="Sunday">Sunday</option>
          </select>              
        </div>          
    </div>


    <input type="submit" id="saveEmp" class="btn btn-primary" value="Submit">
</div>
</form>`;

export const updateEmpDetailsForm = (empDetails) => {
  const modalBody = document.querySelector("#updateModal .modal-body");
  modalBody.innerHTML = `
  <form id="updateEmpForm">
<div class="emp-group row">
    <label class="col-sm-2 col-form-label" for="name">Name</label>
    <div class="col-sm-10">
    <input class="form-control" type="text" id="name" name="name" value="${
      empDetails.name
    }" minlength="5" required>
    </div>
</div>

<div class="emp-group row">
    <label class="col-sm-2 col-form-label" for="sex">Sex</label>
    
    <div class="col-sm-10 d-flex align-items-center">
      <div class="form-check form-check-inline">
        <input class="form-check-input" type="radio" name="sex" id="female" value="Female" ${
          empDetails.sex === "Female" ? "checked" : ""
        }>
        <label class="form-check-label" for="female">Female</label>
      </div>

      <div class="form-check form-check-inline">
          <input class="form-check-input" type="radio" name="sex" id="male" value="Male" ${
            empDetails.sex === "Male" ? "checked" : ""
          }>
         <label class="form-check-label" for="male">Male</label>
      </div>
    </div>
</div>

<div class="emp-group row">
    <label class="col-sm-2 col-form-label" for="department">Department</label>
    <div class="col-sm-10">
      <select class="col-sm-2 form-control" id="department" name="department" required>
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
    </div>
    </div>

    <div class="emp-group row">
        <label class="col-sm-2 col-form-label" for="employeeType">Employee Type</label>
        <div class="col-sm-10">
          <select class="col-sm-2 form-control" id="employeeType" name="employeeType" required>
              <option value="">Select Employee Type</option>
              <option value="Regular" ${
                empDetails.employeeType === "Regular" ? "selected" : ""
              }>Regular</option>
              <option value="Probation" ${
                empDetails.employeeType === "Probation" ? "selected" : ""
              }>Probation</option>
          </select>
        </div>
    </div>

    <div class="emp-group row">
        <label class="col-sm-2 col-form-label" for="role">Role</label>
        <div class="col-sm-10 row">
            <input class="col-sm-2 form-control" type="text" id="role" name="role" value="${
              empDetails.role
            }" required>
        </div>
    </div>

      <div class="emp-group row">
        <label class="col-sm-2 col-form-label" for="bacisSalary">Basic Salary</label>
        <div class="col-sm-10">
            <input class="col-sm-2 form-control" type="number" id="basicSalary" name="basicSalary" value="${cleaningDataInstance.formatStringtoNumber(
              empDetails.basicSalary
            )}" required>
        </div>
    </div>

    <div class="emp-group row">
        <label class="col-sm-2 col-form-label" for="dayOff">Day Off</label>
        <div class="col-sm-10">
            <select class="col-sm-2 form-control" id="dayOff" name="dayOff" required>
                <option value="">Select Day Off</option>
                <option value="Saturday&Sunday" ${
                  empDetails.dayOff === "Saturday&Sunday" ? "selected" : ""
                }>Saturday&Sunday</option>
                <option value="Sunday"  ${
                  empDetails.dayOff === "Sunday" ? "selected" : ""
                }>Sunday</option>
            </select>              
        </div>          
    </div>

   
    <div class="emp-group row ">
        <label class="col-sm-2 col-form-label" for="isResignTrue">Resign: </label>
        <div class="col-sm-10">
          <div class="form-check form-check-inline">
          <input class="form-check-input" type="radio" name="isResign" id="isResignTrue" value="true" ${
            empDetails.isResign ? "checked" : ""
          }
            <label class="form-check-label" for="isResignFalse">True</label>
          </div>
          
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" name="isResign" id="isResignFalse" value="false" ${
              !empDetails.isResign ? "checked" : ""
            }>
            <label class="form-check-label" for="isResign">False</label>
          </div>
        </div>
    </div>

    <div class="emp-group row " >
    <label class="col-sm-2 col-form-label" for ="resignDate">Resign Date:</label>
    <div class="col-sm-10" style="${
      empDetails.isResign ? "display: block;" : "display: none;"
    }">
      <input class="form-control" type="date" id="resignDate" name="resignDate" value="${
        empDetails.isResign
          ? new Date(empDetails.resignDate).toISOString().split("T")[0]
          : ""
      }">  
      </div>
    </div>

</div>
</form>`;
};
