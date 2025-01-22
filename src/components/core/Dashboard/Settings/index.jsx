import ChangeProfilePicture from "./ChangeProfilePicture";
import DeleteAccount from "./DeleteAccount";
import EditProfile from "./EditProfile";
import UpdatePassword from "./UpdatePassword";

import { BackgroundBeams } from "../../../../components/ui/background-beam";

export default function Settings() {
  return (
    <div className="flex flex-col gap-8">
      <h1 className="mt-16 ml-12 text-3xl font-medium underline text-richblack-5">
        Edit Profile
      </h1>
      {/* Change Profile Picture */}
      <ChangeProfilePicture />
      {/* Profile */}
      <EditProfile />
      {/* Password */}
      <UpdatePassword />
      {/* Delete Account */}
      <DeleteAccount />
    </div>
  );
}
