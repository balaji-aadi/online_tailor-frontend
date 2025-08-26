import AdminPortal from "../pages/admin/AdminPortal.jsx";
import TailorPortal from "../pages/tailor/TailorPortal.jsx";

const Index = () => {
  const isAdmin = true
  return (
    <div>
      {isAdmin ? <AdminPortal /> : <TailorPortal />}
    </div>
  )
}

export default Index
