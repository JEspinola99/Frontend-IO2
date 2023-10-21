export const MemberList = ({miembros}: any) => {
    return (
        <>
            {
                miembros?.map((miembro: any) => (
                    <div key={miembro.id}>{miembro.email}</div>
                ))
            }
        </>
    )
}