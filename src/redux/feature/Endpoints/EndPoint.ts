import { TLession, TResponseRedux } from "../../../utils/global";
import { baseApi } from "../../api/baseApi";
import { TUser } from "../auth/auth.slice";

const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllLessons: builder.query({
            query: () => {
                return { url: '/lession', method: 'GET' };
            },
            transformResponse: (response: TResponseRedux<TLession[]>) => {
                return {
                    data: response.data
                };
            },
        }),
        getAllUsers: builder.query({
            query: () => {
                return { url: '/auth/all-profile', method: 'GET' };
            },
            transformResponse: (response: TResponseRedux<TUser[]>) => {
                return {
                    data: response.data
                };
            },
        }),
        updateUserRoleIntoAdmin: builder.mutation({
            query: ({ userId, role }) => ({
                url: `/auth/${userId}`,
                method: 'PUT',
                body: { role }
            }),
            transformResponse: (response: TResponseRedux<TUser>) => response.data
        }),
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `auth/${id}`,
                method: 'DELETE'
            })
        }),
        deleteLesson: builder.mutation({
            query: (id) => ({
                url: `lession/${id}`,
                method: 'DELETE'
            })
        }),
        deleteVocabulary: builder.mutation({
            query: ({id,vocabularyId}) => ({
                url: `lession/${id}/vocabulary/${vocabularyId}`,
                method: 'DELETE'
            })
        }),
        createLesson: builder.mutation({
            query: (newLesson) => ({
                url: 'lession',
                method: 'POST',
                body: newLesson
            })
        }),
        updateLesson: builder.mutation({
            query: ({ LessonlId, data }) => ({
                url: `lession/${LessonlId}`,
                method: 'PUT',
                body: { data }
            })
        }),
        createVocabulary: builder.mutation({
            query: ({ LessonId, vocabulary }) => ({
                url: `lession/${LessonId}/add-vocabulary`,
                method: 'POST',
                body: vocabulary
            })
        }),
    }),
});


export const {

    useGetAllLessonsQuery,
    useGetAllUsersQuery,
    useUpdateUserRoleIntoAdminMutation,
    useDeleteUserMutation,
    useCreateLessonMutation,
    useDeleteLessonMutation,
    useUpdateLessonMutation,
    useCreateVocabularyMutation,
    useDeleteVocabularyMutation
} = authApi