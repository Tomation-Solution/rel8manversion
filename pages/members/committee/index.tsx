import { NextPage } from 'next'
import { useEffect } from 'react'
import { DashboardLayout } from '../../../components/Dashboard/Member/Sidebar/dashboard-layout'
import Newscard from '../../../components/NewsCard'
import Spinner from '../../../components/Spinner'
import useToast from '../../../hooks/useToast'
import { get_commitee } from '../../../redux/committee/CommitteeApi'
import { selectCommitee } from '../../../redux/committee/committeeSlice'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import { Grid, Typography } from "@material-ui/core"
import { useRouter } from 'next/router'

const Committee: NextPage = () => {
  const router = useRouter()
  const { commitee, status, message } = useAppSelector(selectCommitee)
  const { notify } = useToast()
  const dispatch = useAppDispatch()

  const handleCommiteeDetailRoute = (id: number) => {
    router.push(`committee/${id}/`)
  }

  useEffect(() => {
    if (status === 'error' && message) {
      notify(message, 'error')
    }
  }, [status])

  useEffect(() => {
    dispatch(get_commitee())
  }, [])

  return (
    <DashboardLayout>
      {status === 'pending' && <Spinner />}
      <Grid container spacing={2} style={{ padding: '1rem' }}>
        {status !== 'pending' && commitee.length === 0 && (
          <Typography variant="h6" style={{ margin: '2rem auto', textAlign: 'center' }}>
            No Committees Available
          </Typography>
        )}
        {commitee.map((data, index) => (
          <Newscard
            key={index}
            title={data.name}
            image={data.team_of_reference}
            body={'..'}
            data={data}
            onBtnClick={() => handleCommiteeDetailRoute(data.id)}
          />
        ))}
      </Grid>
    </DashboardLayout>
  )
}

export default Committee
