import Button from '@material-tailwind/react/Button'
import Icon from '@material-tailwind/react/Icon'
import { useSession } from 'next-auth/client'
import { useRouter } from 'next/dist/client/router'
import { db } from '../firebase'
import Login from './Login'

const DocumentRow = ({ id, fileName, date }) => {
	const [session] = useSession()
	if (!session) return <Login />

	const router = useRouter()

	const handleDelete = (e, id) => {
		e.stopPropagation()
		console.log(id)
		db.collection('userDocs')
			.doc(session.user.email)
			.collection('docs')
			.doc(id)
			.delete()
	}

	return (
		<div
			className='flex items-center p-4 rounded-lg hover:bg-gray-100 cursor-pointer text-gray-700 text-sm'
			onClick={() => router.push(`/doc/${id}`)}
		>
			<Icon name='article' size='3xl' color='blue' />
			<p className='flex-grow pl-5 pr-10 w-10 truncate'>{fileName}</p>
			<p className='pr-5 text-sm'>{date?.toDate().toLocaleDateString()}</p>
			<Button
				color='gray'
				buttonType='outline'
				iconOnly={true}
				rounded={true}
				ripple='dark'
				className='border-0'
				onClick={e => handleDelete(e, id)}
			>
				<Icon name='more_vert' size='3xl' />
			</Button>
		</div>
	)
}

export default DocumentRow
