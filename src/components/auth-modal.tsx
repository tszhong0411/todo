import { Button, Dialog, DialogContent, DialogTitle } from '@tszhong0411/ui'
import { useSignInWithGoogle } from 'react-firebase-hooks/auth'

import { auth } from '@/lib/firebase/app'

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
          loading={loading}
          disabled={loading}
        >
          <div>Sign in with Google</div>
        </Button>
      </DialogContent>
    </Dialog>
  )
}
export default AuthModal
