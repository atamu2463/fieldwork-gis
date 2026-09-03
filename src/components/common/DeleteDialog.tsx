import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import type { ReactNode } from 'react'

export function DeleteDialog({ trigger, title, description, onDelete }: { trigger: ReactNode; title: string; description: string; onDelete?: () => void }) {
  return <AlertDialog><AlertDialogTrigger render={<Button variant="destructive" size="sm" />}>{trigger}</AlertDialogTrigger><AlertDialogContent><AlertDialogHeader><AlertDialogTitle>{title}</AlertDialogTitle><AlertDialogDescription>{description}</AlertDialogDescription></AlertDialogHeader><AlertDialogFooter><AlertDialogCancel>キャンセル</AlertDialogCancel><AlertDialogAction variant="destructive" onClick={onDelete}>削除する</AlertDialogAction></AlertDialogFooter></AlertDialogContent></AlertDialog>
}