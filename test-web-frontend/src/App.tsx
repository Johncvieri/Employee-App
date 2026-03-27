import { EmployeeProvider } from './context/EmployeeContext';
import EmployeeManager from './components/organism/EmployeeManagers';

export default function App() {
  return (
    <EmployeeProvider>
      <EmployeeManager />
    </EmployeeProvider>
  );
}