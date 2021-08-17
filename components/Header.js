import Button from '@material-tailwind/react/Button'
import Icon from '@material-tailwind/react/Icon'
import { signOut, useSession } from 'next-auth/client'

const Header = () => {
	const [session] = useSession()

	return (
		<div className='flex items-center sticky top-0 z-50 px-4 py-3 shadow-md bg-white'>
			<Button
				color='gray'
				buttonType='outline'
				rounded={true}
				iconOnly={true}
				ripple='dark'
				className='h-10 w-10 border-0 mr-1'
			>
				<Icon name='menu' size='2xl' />
			</Button>

			<Icon name='descriptions' size='3xl' color='blue' />

			<h1 className='text-gray-700 ml-1 text-xl'>Docs</h1>

			<div className='mx-5 md:mx-20 flex flex-grow items-center px-4 py-2 bg-gray-100 text-gray-600 rounded-lg focus-within:shadow-md'>
				<Icon name='search' size='3xl' color='darkgray' />
				<input
					type='text'
					placeholder='search'
					className='bg-transparent outline-none flex-grow text-base px-5'
				/>
			</div>

			<Button
				color='gray'
				buttonType='outline'
				rounded={true}
				iconOnly={true}
				ripple='dark'
				className='h-10 w-10 border-0 ml-5'
			>
				<Icon name='apps' size='2xl' color='gray' />
			</Button>
			<img
				loading='lazy'
				className='cursor-pointer h-10 w-10 rounded-full ml-2'
				src={
					session?.user?.image ||
					'https://stonegatesl.com/wp-content/uploads/2021/01/avatar.jpg'
				}
				alt='User'
				onClick={signOut}
			/>
		</div>
	)
}

export default Header
