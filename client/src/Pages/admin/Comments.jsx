import React, { useState } from 'react'
import { assets } from '../../assets/assets'

const initialComments = [
    {
        id: 1,
        blog: "A detailed step by step guide to manage your lifestyle",
        name: "Michael Scott",
        comment: "This is my new comment",
        date: "4/30/2025",
        isApproved: true
    },
    {
        id: 2,
        blog: "How to create an effective startup roadmap or ideas",
        name: "John Doe",
        comment: "This is a nice blog",
        date: "4/29/2025",
        isApproved: true
    },
    {
        id: 3,
        blog: "Tips for getting the most out of apps and software",
        name: "Sam Smith",
        comment: "This is the best blog, everybody should read it",
        date: "4/22/2025",
        isApproved: true
    }
]

const Comments = () => {
    const [comments, setComments] = useState(initialComments)
    const [filter, setFilter] = useState('all') // 'all', 'approved', 'not-approved'

    const handleApprovalToggle = (commentId) => {
        setComments(prevComments =>
            prevComments.map(comment =>
                comment.id === commentId
                    ? { ...comment, isApproved: !comment.isApproved }
                    : comment
            )
        )
    }

    const handleDelete = (commentId) => {
        setComments(prevComments =>
            prevComments.filter(comment => comment.id !== commentId)
        )
    }

    const filteredComments = comments.filter(comment => {
        if (filter === 'approved') return comment.isApproved
        if (filter === 'not-approved') return !comment.isApproved
        return true
    })

    return (
        <div className="flex-1 p-4 md:p-10 bg-blue-50/50">
            <div className="bg-white rounded-lg shadow">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold text-gray-800">Comments</h2>
                        <div className="space-x-2">
                            <button 
                                onClick={() => setFilter('approved')}
                                className={`px-4 py-2 rounded-md transition-colors ${
                                    filter === 'approved'
                                        ? 'bg-green-100 text-green-800'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                            >
                                Approved
                            </button>
                            <button 
                                onClick={() => setFilter('not-approved')}
                                className={`px-4 py-2 rounded-md transition-colors ${
                                    filter === 'not-approved'
                                        ? 'bg-red-100 text-red-800'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                            >
                                Not Approved
                            </button>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {filteredComments.map(comment => (
                            <div key={comment.id} className="border rounded-lg p-4">
                                <div className="grid grid-cols-[1fr,auto] gap-4">
                                    <div>
                                        <div className="mb-2">
                                            <span className="text-gray-600 font-medium">Blog: </span>
                                            <span className="text-gray-800">{comment.blog}</span>
                                        </div>
                                        <div className="mb-1">
                                            <span className="text-gray-600 font-medium">Name: </span>
                                            <span className="text-gray-800">{comment.name}</span>
                                        </div>
                                        <div className="mb-1">
                                            <span className="text-gray-600 font-medium">Comment: </span>
                                            <span className="text-gray-800">{comment.comment}</span>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-gray-500 mb-2">{comment.date}</div>
                                        <div className="flex items-center space-x-2">
                                            <button
                                                onClick={() => handleApprovalToggle(comment.id)}
                                                className={`p-2 rounded-full transition-colors ${
                                                    comment.isApproved
                                                        ? 'text-green-600 hover:text-green-700'
                                                        : 'text-gray-400 hover:text-gray-500'
                                                }`}
                                            >
                                                <img 
                                                    src={assets.tick_icon} 
                                                    alt="Approve" 
                                                    className="w-5 h-5"
                                                />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(comment.id)}
                                                className="p-2 rounded-full text-red-500 hover:text-red-600 transition-colors"
                                            >
                                                <img 
                                                    src={assets.bin_icon} 
                                                    alt="Delete" 
                                                    className="w-5 h-5"
                                                />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Comments
