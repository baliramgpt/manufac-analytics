interface Employee {
    uniqueId: number;
    name: string;
    subordinates: Employee[];
  }
  
  interface IEmployeeOrgApp {
    ceo: Employee;
    move(employeeID: number, supervisorID: number): void;
    undo(): void;
    redo(): void;
  }
  
  class EmployeeOrgApp implements IEmployeeOrgApp {
    private history: {
      move: { employeeID: number; supervisorID: number | null}[];
      undo: { employeeID: number; supervisorID: number | null}[];
    };
    public ceo: Employee;
  
    constructor(ceo: Employee) {
      this.history = {
        move: [],
        undo: [],
      };
      this.ceo = ceo;
    }
  
    move(employeeID: number, supervisorID: number): void {
      const employee = this.findEmployee(this.ceo, employeeID);
      const supervisor = this.findEmployee(this.ceo, supervisorID);
  
      if (!employee || !supervisor) {
        throw new Error('Invalid employee or supervisor ID');
      }
  
      // Store the current state for undo operation
      this.history.undo.push({
        employeeID,
        supervisorID: employee.subordinates.length > 0 ? employee.subordinates[0].uniqueId : null,
      });
  
      // Update the employee's supervisor
      employee.subordinates = [];
      supervisor.subordinates.push(employee);
      employee.subordinates = [];
  
      // Store the move action in history
      this.history.move.push({ employeeID, supervisorID });
    }
  
    undo(): void {
      const lastMove = this.history.move.pop();
      if (lastMove) {
        const { employeeID, supervisorID } = lastMove;
        const employee = this.findEmployee(this.ceo, employeeID);
        const supervisor = this.findEmployee(this.ceo, supervisorID);
  
        if (!employee || !supervisor) {
          throw new Error('Invalid employee or supervisor ID');
        }
  
        // Store the current state for redo operation
        this.history.undo.push({
          employeeID,
          supervisorID: employee.subordinates.length > 0 ? employee.subordinates[0].uniqueId : null,
        });
  
        // Move the employee back to the previous supervisor
        supervisor.subordinates = supervisor.subordinates.filter((subordinate) => subordinate.uniqueId !== employeeID);
        employee.subordinates = [];
  
        // Store the undo action in history
        this.history.undo.push({ employeeID, supervisorID: supervisorID });
      }
    }
  
    redo(): void {
      const lastUndo = this.history.undo.pop();
      if (lastUndo) {
        const { employeeID, supervisorID } = lastUndo;
        const employee = this.findEmployee(this.ceo, employeeID);
        const supervisor = this.findEmployee(this.ceo, supervisorID);
  
        if (!employee || !supervisor) {
          throw new Error('Invalid employee or supervisor ID');
        }
  
        // Store the current state for undo operation
        this.history.move.push({
          employeeID,
          supervisorID: employee.subordinates.length > 0 ? employee.subordinates[0].uniqueId : null,
        });
  
        // Move the employee back to the previous supervisor
        employee.subordinates = [];
        supervisor.subordinates.push(employee);
        employee.subordinates = [];
  
        // Store the redo action in history
        this.history.undo.push({ employeeID, supervisorID });
      }
    }
  
    private findEmployee(employee: Employee, employeeID: number | null): Employee | undefined {
      if (employee.uniqueId === employeeID) {
        return employee;
      }
  
      for (const subordinate of employee.subordinates) {
        const foundEmployee = this.findEmployee(subordinate, employeeID);
        if (foundEmployee) {
          return foundEmployee;
        }
      }
  
      return undefined;
    }
  }