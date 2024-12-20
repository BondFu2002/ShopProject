import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common'; // 导入 NestJS 的 ArgumentsHost, Catch 和 HttpStatus
import { BaseExceptionFilter } from '@nestjs/core'; // 导入 NestJS 的 BaseExceptionFilter
import { Prisma } from '@prisma/client'; // 导入 Prisma 客户端
import { Response } from 'express'; // 导入 Express 的 Response

// 使用 Catch 装饰器捕获 PrismaClientKnownRequestError 类型的异常
@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  // 重写 catch 方法来处理异常
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    console.error(exception.message); // 打印异常信息到控制台
    const ctx = host.switchToHttp(); // 获取 HTTP 上下文
    const response = ctx.getResponse<Response>(); // 从上下文中获取 Response 对象
    const message = exception.message.replace(/\n/g, ''); // 移除异常消息中的换行符

    // 使用 switch 语句根据异常代码处理不同的异常情况
    switch (exception.code) {
      case 'P2002': {
        // 处理唯一性冲突异常（Unique constraint failed on the {constraint} field(s) ({target})）
        const status = HttpStatus.CONFLICT; // 设置 HTTP 状态码为 409（冲突）
        response.status(status).json({
          statusCode: status,
          message: 'Unique constraint failed',
          error: message,
        });
        break;
      }
      case 'P2003': {
        // 处理外键约束失败异常（Foreign key constraint failed on the {constraint} field(s) ({target})）
        const status = HttpStatus.BAD_REQUEST; // 设置 HTTP 状态码为 400（错误请求）
        response.status(status).json({
          statusCode: status,
          message: 'Foreign key constraint failed',
          error: message,
        });
        break;
      }
      case 'P2000': {
        // 处理数据库连接异常（The server failed to start the transaction, it encountered an unexpected error）
        const status = HttpStatus.INTERNAL_SERVER_ERROR; // 设置 HTTP 状态码为 500（内部服务器错误）
        response.status(status).json({
          statusCode: status,
          message: 'Database connection error',
          error: message,
        });
        break;
      }
      case 'P2001': {
        // 处理记录不存在异常（The record searched for in the where condition does not exist）
        const status = HttpStatus.NOT_FOUND; // 设置 HTTP 状态码为 404（未找到）
        response.status(status).json({
          statusCode: status,
          message: 'Record not found',
          error: message,
        });
        break;
      }
      case 'P2025': {
        // 处理记录不存在异常（An operation failed because it depends on one or more records that do not exist. {cause}）
        const status = HttpStatus.NOT_FOUND; // 设置 HTTP 状态码为 404（未找到）
        response.status(status).json({
          statusCode: status,
          message: 'Record not found',
          error: message,
        });
        break;
      }
      default: // 处理其他未定义的异常情况
        // 默认情况调用父类的 catch 方法处理异常，并返回 500 内部服务器错误
        super.catch(exception, host);
        break;
    }
  }
}
