import { Loader2 } from 'lucide-react'
import { useSignInWithGoogle } from 'react-firebase-hooks/auth'

import { auth } from '@/lib/firebase/app'

import { Button } from './ui/button'
import { Dialog, DialogContent, DialogTitle } from './ui/dialog'

type AuthModalProps = {
  open: boolean
}

const AuthModal = (props: AuthModalProps) => {
  const { open } = props
  const [signInWithGoogle, _, loading] = useSignInWithGoogle(auth)

  return (
    <Dialog open={open}>
      <DialogContent className='flex flex-col items-center justify-center gap-4 py-12'>
        <DialogTitle className='text-center text-2xl font-bold'>
          Sign in
        </DialogTitle>
        <Button
          type='button'
          onClick={() => signInWithGoogle()}
          disabled={loading}
        >
          {loading && <Loader2 size={16} className='mr-2 animate-spin' />}
          Sign in with Google
        </Button>
      </DialogContent>
    </Dialog>
  )
}
export default AuthModal
