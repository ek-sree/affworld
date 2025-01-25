import Header from "../../components/user/Header"
import TaskTable from "../../components/user/TaskTable"
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const LandingPage = () => {
  return (
    <div>
        <Header/>
        <DndProvider backend={HTML5Backend}>
        <TaskTable />
      </DndProvider>
    </div>
  )
}

export default LandingPage