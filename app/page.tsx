import Link from 'next/link'

export default function Home() {
  return (
    <div className='flex flex-col gap-5 place-items-center place-content-center w-screen h-screen'>
      <Link href='/employees'  >Employees</Link>
      <Link href='/skills' >Skills</Link>
    </div>
  )
}
