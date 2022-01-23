import java.io.File
import kotlin.system.measureTimeMillis

data class TreeNode(
    var value: Int,
    var left: TreeNode? = null,
    var right: TreeNode? = null
) {
    companion object {
        fun insertAll(values: List<Int>): TreeNode =
            values.firstOrNull()?.let { rootValue ->
                val node = TreeNode(rootValue)
                values.drop(1).forEach { node.insert(it) }
                node
            } ?: throw Exception("値が存在しません")
    }

    private fun insert(value: Int) {
        if (value < this.value) {
            left?.insert(value) ?: run { this.left = TreeNode(value) }
        } else if (value > this.value) {
            right?.insert(value) ?: run { this.right = TreeNode(value) }
        } else {
            println("すでに存在する値です")
        }
    }

    fun findDebug(value: Int) {
        find(value)?.run {
            println("$value is found!")
        } ?: println("$value is not found.")
    }

    fun find(value: Int): TreeNode? {
        return when {
            this.value > value -> left?.find(value)
            this.value < value -> right?.find(value)
            else -> this
        }
    }
}

fun main() {
    val fileName = "data_1000000.txt"
    val data = File(fileName).readLines().map(String::toInt)
    var start = System.nanoTime()
    val tree = TreeNode.insertAll(data)
    var end = System.nanoTime()
    println("二分探査木 生成: ${((end - start) / 1000000000.0)}")
    start = System.nanoTime()
    (0..10000000).forEach { value ->
        tree.find(value)
    }
    end = System.nanoTime()
    println("二分探査木 検索: ${((end - start) / 1000000000.0)}")
}
