import getUserAction from '@/app/actions/user/getUser.action'

const ProfilePage = async() => {
    const user = await getUserAction()
  return (
    <div>ProfilePage</div>
  )
}

export default ProfilePage