# EmployeeOrgApp

This is a TypeScript implementation of the EmployeeOrgApp.

### Installation

1. Clone the repository:
git clone <repository_clone_url>

To run the project, use any online ts code editor:
open https://playcode.io/typescript

Copy the code from app.ts file

Scroll to the end and paste below lines :
const ceo: Employee = {
  uniqueId: 1,
  name: 'John Smith',
  subordinates: [
    {
      uniqueId: 2,
      name: 'Margot Donald',
      subordinates: [
        {
          uniqueId: 3,
          name: 'Cassandra Reynolds',
          subordinates: []
        },
        {
          uniqueId: 4,
          name: 'Mary Blue',
          subordinates: []
        },
        {
          uniqueId: 5,
          name: 'Bob Saget',
          subordinates: []
        },
        {
          uniqueId: 6,
          name: 'Tina Teff',
          subordinates: []
        },
        {
          uniqueId: 7,
          name: 'Will Turner',
          subordinates: []
        }
      ]
    },
    {
      uniqueId: 8,
      name: 'Tyler Simpson',
      subordinates: [
        {
          uniqueId: 9,
          name: 'Harry Tobs',
          subordinates: []
        },
        {
          uniqueId: 10,
          name: 'Thomas Brown',
          subordinates: []
        },
        {
          uniqueId: 11,
          name: 'George Carrey',
          subordinates: []
        },
        {
          uniqueId: 12,
          name: 'Gary Styles',
          subordinates: []
        },
        {
          uniqueId: 13,
          name: 'Ben Willis',
          subordinates: []
        },
        {
          uniqueId: 14,
          name: 'Georgina Flangy',
          subordinates: []
        },
        {
          uniqueId: 15,
          name: 'Sophie Turner',
          subordinates: []
        }
      ]
    }
  ]
};

const app = new EmployeeOrgApp(ceo);
// Move an employee to a new supervisor
app.move(5, 14);

// Print the updated organization chart
console.log(JSON.stringify(app.ceo, null, 2));

// Undo the last move action
app.undo();

// Print the organization chart after undoing the move
console.log(JSON.stringify(app.ceo, null, 2));

// Redo the previously undone action
app.redo();

// Print the organization chart after redoing the move
console.log(JSON.stringify(app.ceo, null, 2));