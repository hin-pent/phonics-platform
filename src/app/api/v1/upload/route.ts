import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

export async function POST(request: NextRequest) {
  try {
    console.log('=== 文件上传 API ===');
    
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const type = formData.get('type') as string; // audio, image, document

    if (!file) {
      return NextResponse.json({
        success: false,
        error: { code: 'VALIDATION_ERROR', message: '没有选择文件' },
        timestamp: new Date().toISOString(),
      }, { status: 400 });
    }

    // 验证文件类型
    const allowedTypes = {
      audio: ['audio/webm', 'audio/mp3', 'audio/wav', 'audio/ogg'],
      image: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
      document: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
    };

    const typeAllowedTypes = allowedTypes[type as keyof typeof allowedTypes] || [];
    if (type && !typeAllowedTypes.includes(file.type)) {
      return NextResponse.json({
        success: false,
        error: { code: 'INVALID_FILE_TYPE', message: '不支持的文件类型' },
        timestamp: new Date().toISOString(),
      }, { status: 400 });
    }

    // 验证文件大小 (10MB)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json({
        success: false,
        error: { code: 'FILE_TOO_LARGE', message: '文件大小不能超过10MB' },
        timestamp: new Date().toISOString(),
      }, { status: 400 });
    }

    // 生成文件名
    const timestamp = Date.now();
    const randomId = Math.random().toString(36).substring(2, 8);
    const fileExtension = file.name.split('.').pop() || 'bin';
    const fileName = `${timestamp}-${randomId}.${fileExtension}`;
    
    // 确定存储目录
    const uploadDir = join(process.cwd(), 'public', 'uploads', type || 'files');
    
    // 创建目录（如果不存在）
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    // 保存文件
    const filePath = join(uploadDir, fileName);
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    await writeFile(filePath, buffer);
    
    // 生成文件访问URL
    const fileUrl = `/uploads/${type || 'files'}/${fileName}`;

    console.log('✅ 文件上传成功:', {
      fileName,
      fileUrl,
      size: file.size,
      type: file.type
    });

    return NextResponse.json({
      success: true,
      data: {
        fileName,
        fileUrl,
        originalName: file.name,
        size: file.size,
        type: file.type,
      },
      message: '文件上传成功！📁',
      timestamp: new Date().toISOString(),
    }, { status: 201 });

  } catch (error) {
    console.error('❌ 文件上传失败:', error);
    return NextResponse.json({
      success: false,
      error: { 
        code: 'INTERNAL_ERROR', 
        message: '文件上传失败，请重试' 
      },
      timestamp: new Date().toISOString(),
    }, { status: 500 });
  }
}