// export interface WorkTask {
//   id: number;
//   taskId:string;
//   desc: string;
//   subtasks?: number[];
//   actionBy: string;
//   targetDate: string;
//   percComplete: number;
//   status: string;
//   remarks: string;
// }

import faker from "faker";
import { NumberLiteralType } from "typescript";

export interface WorkTask {
  id: number;
  taskId: string;
  task: string;
  taskList?: string[];
  actionBy: string;
  targetDate: string;
  percComplete: number;
  status: string;
  remarks: string;
  priority?: number;
}

export interface WorkTaskDisplay {
  id: number;
  taskId: string;
  task: string;
  taskList?: string[];
  actionBy: string;
  targetDate: string;
  percComplete: number;
  status: string;
  remarks: string;
  priority?: number;
  showChild?: boolean;
  childTabs?: string;
}

export interface TaskCollection {
  id: number;
  collection: string;
  collId: string;
  taskList?: string[];
}

export interface Project {
  id: number;
  name: string;
  collectionList: string[];
}

export const Statuses = [
  "OPEN",
  "ASSIGNED",
  "PENDING",
  "SUBMITTED",
  "APPROVED",
];
export const Priorities = ["LOW", "MEDIUM", "HIGH"];

export const getTaskDisplay = (tasks: WorkTask[]) => {
  let taskdisplay: WorkTaskDisplay[] = [];

  taskdisplay = tasks.map(
    (task) =>
      ({
        id: task.id,
        taskId: task.taskId,
        task: task.task,
        taskList: task.taskList,
        actionBy: task.actionBy,
        targetDate: task.targetDate,
        percComplete: task.percComplete,
        status: task.status,
        remarks: task.remarks,
        priority: task.priority,
        showChild: false,
        childTabs: "#".repeat((task.taskId.match(/\./g) || []).length),
      } as WorkTaskDisplay)
  );

  return taskdisplay;
};

export const genRandomTasks = (
  count: number,
  start: number = 1,
  parent: string = ""
): WorkTask[] => {
  let retTask: WorkTask[] = [];
  let nameList: string[] = [];
  for (let ii = 0; ii < (count > 2 ? 2 : 1); ii++) {
    nameList.push(faker.name.firstName());
  }
  for (let index = 0; index < count; index++) {
    retTask.push({
      id: start + index,
      taskId:
        parent.length > 0
          ? parent + "." + (index + start)
          : "" + (index + start),
      task: faker.lorem.sentence(5),
      taskList: [],
      actionBy:
        nameList[faker.datatype.number({ min: 0, max: nameList.length - 1 })],
      targetDate: faker.date.past().toDateString(),
      percComplete: parseFloat(
        (faker.datatype.float({ min: 0, max: 1 }) * 100).toFixed(2)
      ),
      status: Statuses[faker.datatype.number({ min: 0, max: 4 })],
      remarks: faker.lorem.sentence(10),
      priority: faker.datatype.number({ min: 0, max: 2 }),
    });
  }
  console.log("Returning Task List:" + JSON.stringify(retTask, null, 2));
  return retTask;
};

export const genRandomProject = (
  collList: TaskCollection[],
  id: number = 1,
  parent: string = ""
): Project => {
  const proj: Project = {
    id: id,
    name: faker.lorem.sentence(1) + " project",
    collectionList: collList.map((citem) => citem.collId),
  };

  return proj;
};

export const genRandomCollections = (
  taskList: WorkTask[],
  id: number = 1,
  parent: string = ""
): TaskCollection => {
  const coll: TaskCollection = {
    id: id,
    collection: faker.lorem.sentence(2),
    collId: parent.length > 0 ? parent + "." + id : "" + id,
    taskList: taskList.map((titem) => titem.taskId),
  };

  return coll;
};

export const getTasks = (taskList: string[]): WorkTask[] => {
  let tasks: WorkTask[] = Array.from(
    sampleInitialTasks.filter(
      (sitem) => taskList.findIndex((tl) => tl === sitem.taskId) > -1
    )
  );
  return tasks;
};

// export const sampleInitialTasks = genRandomTasks(5);

export const sampleInitialTasks: WorkTask[] = [
  {
    id: 1,
    taskId: "1",
    task: "Quia hic cumque voluptatibus quaerat.",
    taskList: ["1.1", "1.2"],
    actionBy: "Brooks",
    targetDate: "Fri Apr 30 2021",
    percComplete: 0.22,
    status: "PENDING",
    remarks: "Delectus omnis nihil vero nihil possimus alias sit nobis illum.",
    priority: 0,
  },
  {
    id: 2,
    taskId: "2",
    task: "Non earum labore nemo voluptatem.",
    taskList: [],
    actionBy: "Elenora",
    targetDate: "Thu Apr 29 2021",
    percComplete: 0.75,
    status: "APPROVED",
    remarks: "Velit fugiat magnam impedit rerum et qui quisquam atque dolor.",
    priority: 1,
  },
  {
    id: 3,
    taskId: "3",
    task: "Qui quis ut et labore.",
    taskList: [],
    actionBy: "Elenora",
    targetDate: "Wed Feb 24 2021",
    percComplete: 0.66,
    status: "APPROVED",
    remarks:
      "Deleniti sint voluptatem velit esse autem eligendi consectetur quo a.",
    priority: 2,
  },
  {
    id: 4,
    taskId: "1.1",
    task: "Esse aliquam numquam ea deserunt.",
    taskList: [],
    actionBy: "Elenora",
    targetDate: "Wed Jun 23 2021",
    percComplete: 0.85,
    status: "SUBMITTED",
    remarks:
      "Reiciendis quisquam ab quia qui quis exercitationem mollitia aut quod.",
    priority: 1,
  },
  {
    id: 5,
    taskId: "1.2",
    task: "Animi enim voluptates non esse.",
    taskList: [],
    actionBy: "Elenora",
    targetDate: "Wed Nov 24 2021",
    percComplete: 0.83,
    status: "OPEN",
    remarks: "Aut iste error rem aliquid officiis enim dicta libero placeat.",
    priority: 1,
  },
];

export const sampleInitialColl: TaskCollection = {
  id: 1,
  collection: "Voluptatibus una.",
  collId: "1",
  taskList: ["1", "2"],
};

export const sampleInitialCollList: TaskCollection[] = [
  sampleInitialColl,
  {
    id: 2,
    collection: "Voluptatibus dos.",
    collId: "2",
    taskList: ["2", "3"],
  },
];

export const sampleProj: Project = {
  id: 1,
  name: "Voluptatibus. project",
  collectionList: ["1", "2"],
};
// export const sampleTasks: WorkTask[] = [
//   {
//     id: 1,
//     taskId: "1",
//     task: "UPDATE FOR NEW V.O ALL V.O CLAIMS WITH PHOTO",
//     taskList: [],
//     actionBy: "Jerson",
//     targetDate: "20/12/21",
//     percComplete: 0.8,
//     status: "SUBMITTED",
//     remarks: "UPDATE AS LATEST MARTIN CLAIM EVERY 20TH",
//   },
//   {
//     id: 2,
//     taskId: "2",
//     task: "ADDITIONAL PANEL DOOR AT B1 VALVE COMPARTMENT",
//     taskList: [],
//     actionBy: "Jerson",
//     targetDate: "20/12/21",
//     percComplete: 0.8,
//     status: "APPROVED",
//     remarks: "FABRICATION ALL DONE! ANY TIME CAN COLLECT",
//   },
//   {
//     id: 3,
//     taskId: "3",
//     task: "ALL NEW S.I FOLLOW-UP ORDER GLASS BROKEN",
//     actionBy: "Jerson",
//     targetDate: "20/12/21",
//     percComplete: 0.8,
//     status: "PENDING",
//     remarks: "ALL RECORDED WITH S.I",
//   },
//   {
//     id: 4,
//     taskId: "4",
//     task: "CURTAINWALL ROOF TERMINATION DETAIL (VERY URGENT)",
//     taskList: ["1"],
//     actionBy: "Eddie",
//     targetDate: "20/12/21",
//     percComplete: 0.8,
//     status: "SUBMITTED",
//     remarks: "SUBMITTED! 01.10.21 TO FOLLOW-UP APPROVAL &",
//   },
//   {
//     id: 5,
//     taskId: "5",
//     task: "STRATA (EXTERNAL SCREEN)",
//     taskList: [],
//     actionBy: "Eddie",
//     targetDate: "20/12/21",
//     percComplete: 0.8,
//     status: "APPROVED",
//     remarks: "SHOP DRAWINGS REV,03 SUBMIITED TO FOLLOW PPROVAL",
//   },
//   {
//     id: 6,
//     taskId: "6",
//     task: "GUARDHOUSE CANOPY",
//     actionBy: "Eddie",
//     targetDate: "20/12/21",
//     percComplete: 0.8,
//     status: "PENDING",
//     remarks: "REV. 2 SUBMITTED 24.11.21 FOLLOW-UP",
//   },
// ];

// export const getSampleTasksForProj = (projId: number) => {
//   return sampleTasks.filter((taskItem) => taskItem.projectId == projId);
// };

export const getEmptyTask = (): WorkTask => {
  return {
    id: 0,
    taskId: "",
    task: "",
    actionBy: "",
    targetDate: "",
    percComplete: 0,
    status: "",
    remarks: "",
  };
};
