import Image from 'next/image'

const Header = () => {
  return (
    <header className='relative flex h-16 w-full items-center justify-center'>
      <div className='flex items-center gap-2'>
        <Image
          src='https://honghong.me/static/images/avatar.png'
          width={40}
          height={40}
          alt='Logo'
          className='rounded-full'
          priority
        />
        Todo
      </div>
    </header>
  )
}

export default Header
