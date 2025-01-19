'use client'

import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import {
  CloudArrowUpIcon,
  DocumentIcon,
  ArrowDownTrayIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import Image from 'next/image'
import { saveAs } from 'file-saver'

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (filename: string) => void;
  defaultFileName: string;
}

const DownloadModal = ({
  isOpen,
  onClose,
  onConfirm,
  defaultFileName,
}: DownloadModalProps) => {
  const [fileName, setFileName] = useState(defaultFileName)

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">파일 다운로드</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>
        <input
          type="text"
          value={fileName}
          onChange={e => setFileName(e.target.value)}
          className="w-full px-3 py-2 border rounded-md mb-4"
          placeholder="파일 이름을 입력하세요"
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            취소
          </button>
          <button
            onClick={() => onConfirm(fileName)}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            다운로드
          </button>
        </div>
      </div>
    </div>
  )
}

export default function PresignedUrlPage() {
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [downloadModal, setDownloadModal] = useState({
    isOpen: false,
    fileKey: '',
    defaultFileName: '',
  })

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setIsUploading(true)
    try {
      const uploadedKeys = await Promise.all(
        acceptedFiles.map(async file => {
          const response = await fetch(
            `/routes/presignedUrl?fileType=${encodeURIComponent(file.type)}`,
          )

          if (!response.ok) {
            throw new Error('Failed to get presigned URL')
          }

          const { uploadUrl, key } = await response.json()

          const uploadResponse = await fetch(uploadUrl, {
            method: 'PUT',
            body: file,
            headers: {
              'Content-Type': file.type,
            },
          })

          if (!uploadResponse.ok) {
            throw new Error('Failed to upload file')
          }

          return key
        }),
      )

      setUploadedFiles(prev => [...prev, ...uploadedKeys])
    } catch (error) {
      console.error('Upload error:', error)
      alert('파일 업로드 중 오류가 발생했습니다.')
    } finally {
      setIsUploading(false)
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif'],
      'application/pdf': ['.pdf'],
      // 필요한 파일 타입을 여기에 추가
    },
  })

  const cdnUrl = process.env.NEXT_PUBLIC_AWS_BUCKET_CDN

  const isImageFile = (key: string) => {
    const extension = key.split('.').pop()?.toLowerCase()
    return ['jpg', 'jpeg', 'png', 'gif'].includes(extension || '')
  }

  const handleDownload = async (key: string) => {
    const fileName = key.split('/').pop() || key
    setDownloadModal({
      isOpen: true,
      fileKey: key,
      defaultFileName: fileName,
    })
  }

  const handleDownloadConfirm = async (fileName: string) => {
    try {
      const fileUrl = `${cdnUrl}/${downloadModal.fileKey}`
      const response = await fetch(fileUrl)
      const blob = await response.blob()
      saveAs(blob, fileName)
    } catch (error) {
      console.error('Download error:', error)
      alert('파일 다운로드 중 오류가 발생했습니다.')
    }
    setDownloadModal({ isOpen: false, fileKey: '', defaultFileName: '' })
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div
        {...getRootProps()}
        className={`
          p-8 border-2 border-dashed rounded-lg cursor-pointer
          transition-all duration-300 ease-in-out
          ${
            isDragActive
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-300 bg-gray-50 hover:border-blue-500'
          }
        `}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center gap-4">
          <CloudArrowUpIcon
            className={`w-12 h-12 ${
              isDragActive ? 'text-blue-500' : 'text-gray-400'
            }`}
          />
          {isUploading ? (
            <p className="text-sm text-gray-600">업로드 중...</p>
          ) : isDragActive ? (
            <p className="text-sm text-blue-500">파일을 여기에 놓아주세요</p>
          ) : (
            <div className="text-center">
              <p className="text-sm text-gray-600">
                파일을 드래그 앤 드롭하거나
              </p>
              <p className="text-sm text-gray-600">클릭하여 선택하세요</p>
            </div>
          )}
          <p className="text-xs text-gray-500">지원 형식: PNG, JPG, GIF, PDF</p>
        </div>
      </div>

      {uploadedFiles.length > 0 && (
        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            업로드된 파일
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {uploadedFiles.map((key, index) => {
              const isImage = isImageFile(key)
              return (
                <div
                  key={index}
                  className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                >
                  {isImage ? (
                    <div className="relative w-full h-48 bg-gray-100">
                      <Image
                        src={`${cdnUrl}/${key}`}
                        alt={key}
                        fill
                        className="object-contain"
                      />
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-48 bg-gray-50">
                      <DocumentIcon className="w-24 h-24 text-gray-400" />
                    </div>
                  )}
                  <div className="p-4">
                    <p
                      className="text-sm text-gray-600 mb-3 truncate"
                      title={key}
                    >
                      {key}
                    </p>
                    <button
                      onClick={() => handleDownload(key)}
                      className="flex items-center justify-center w-full gap-2 px-4 py-2 text-sm text-white bg-blue-500 hover:bg-blue-600 rounded-md transition-colors"
                    >
                      <ArrowDownTrayIcon className="w-4 h-4" />
                      {isImage ? '보기/다운로드' : '다운로드'}
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      <DownloadModal
        isOpen={downloadModal.isOpen}
        onClose={() =>
          setDownloadModal({ isOpen: false, fileKey: '', defaultFileName: '' })
        }
        onConfirm={handleDownloadConfirm}
        defaultFileName={downloadModal.defaultFileName}
      />
    </div>
  )
}
