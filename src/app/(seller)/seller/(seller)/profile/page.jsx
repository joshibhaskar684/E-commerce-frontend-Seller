import UserDetails from "@/seller-components/profile-components/UserDetails";

export default function page () {
    return (
        <>
            <div className="grid grid-cols-1">

               <UserDetails  name={"Bhaskar"} phone={"6395653472"} email={"email@email.com"} />

            </div>
        </>
    )
}