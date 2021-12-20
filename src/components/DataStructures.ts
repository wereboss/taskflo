export interface WorkTask {
  id: number;
  taskId:string;
  desc: string;
  subtasks?: number[];
  actionBy: string;
  targetDate: string;
  percComplete: number;
  status: string;
  remarks: string;
}

export const sampleTasks: WorkTask[] = [
  {
    id: 1,
    taskId: "1",
    desc: "UPDATE FOR NEW V.O ALL V.O CLAIMS WITH PHOTO",
    subtasks: [],
    actionBy: "Jerson",
    targetDate: "20/12/21",
    percComplete: 0.8,
    status: "SUBMITTED",
    remarks: "UPDATE AS LATEST MARTIN CLAIM EVERY 20TH",
  },
  {
    id: 2,
    taskId: "2",
    desc: "ADDITIONAL PANEL DOOR AT B1 VALVE COMPARTMENT",
    subtasks: [],
    actionBy: "Jerson",
    targetDate: "20/12/21",
    percComplete: 0.8,
    status: "APPROVED",
    remarks: "FABRICATION ALL DONE! ANY TIME CAN COLLECT",
  },
  {
    id: 3,
    taskId: "3",
    desc: "ALL NEW S.I FOLLOW-UP ORDER GLASS BROKEN",
    actionBy: "Jerson",
    targetDate: "20/12/21",
    percComplete: 0.8,
    status: "PENDING",
    remarks: "ALL RECORDED WITH S.I",
  },
  {
    id: 4,
    taskId: "4",
    desc: "CURTAINWALL ROOF TERMINATION DETAIL (VERY URGENT)",
    subtasks: [1],
    actionBy: "Eddie",
    targetDate: "20/12/21",
    percComplete: 0.8,
    status: "SUBMITTED",
    remarks: "SUBMITTED! 01.10.21 TO FOLLOW-UP APPROVAL &",
  },
  {
    id: 5,
    taskId: "5",
    desc: "STRATA (EXTERNAL SCREEN)",
    subtasks: [],
    actionBy: "Eddie",
    targetDate: "20/12/21",
    percComplete: 0.8,
    status: "APPROVED",
    remarks: "SHOP DRAWINGS REV,03 SUBMIITED TO FOLLOW PPROVAL",
  },
  {
    id: 6,
    taskId: "6",
    desc: "GUARDHOUSE CANOPY",
    actionBy: "Eddie",
    targetDate: "20/12/21",
    percComplete: 0.8,
    status: "PENDING",
    remarks: "REV. 2 SUBMITTED 24.11.21 FOLLOW-UP",
  },
];

// export const getSampleTasksForProj = (projId: number) => {
//   return sampleTasks.filter((taskItem) => taskItem.projectId == projId);
// };

export const getEmptyTask = ():WorkTask => {
    return {
        id: 0,
        taskId: "",
        desc: "",
        actionBy: "",
        targetDate: "",
        percComplete: 0,
        status: "",
        remarks: "",
      };
}
